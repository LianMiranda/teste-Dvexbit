import { PrismaClient, Status } from "@prisma/client";
import { AppError } from "../../utils/appError";
import { comparePasswords, encryptPassword } from "../../utils/bcrypt";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

interface IUser {
    email: string;
    password: string; 
    firstName: string;
    lastName: string;
}


export const UserService = {
    async create(data: IUser){
            console.log(data);

            if (!data.email?.trim() || !data.password?.trim() || !data.firstName?.trim() || !data.lastName?.trim()) {
                throw new AppError("Verifique se os campos foram preenchidos corretamente", StatusCodes.BAD_REQUEST);
            }
            console.log(data);

            const verifyEmailExists = await this.findByEmail(data.email);

            if (verifyEmailExists) {
                throw new AppError("Já existe um usuário com esse e-mail", StatusCodes.CONFLICT);
            }

            const hash = await encryptPassword(data.password);

            data.password = hash;

            const user = await prisma.user.create({
                data: data,
                select: {
                    email: true,
                    firstName: true,
                    lastName: true,
                }
            })

            return user;
    },

    async findAll(){
            const users = await prisma.user.findMany({
                include: {
                    tasks: true,
                }
            });
            
            if(users.length === 0){
                throw new AppError("Nenhum usuário encontrado", StatusCodes.NOT_FOUND)
            }

            return users;
    },

    async findById(id: string){
            const user = await prisma.user.findUnique({
                where: {id},
                include: {
                    tasks: true,
                }
            });

            if(!user){
                throw new AppError("Usuário não encontrado", StatusCodes.NOT_FOUND)
            }
    
            return user;
    },

        async findByEmail(email: string){
            const user = await prisma.user.findUnique({
                where: {email},
            });
            
            
            return user;
        },

        async update(id: string, data:{email: string, password: string, actualPassword: string, firstName: string, lastName:string}){
            let password: string;

            if(!data.email && !data.password && !data.firstName && !data.lastName){
                throw new AppError("Informe ao menos um valor para atualizar", StatusCodes.BAD_REQUEST);
            }

            const verifyUserExists = await this.findById(id);
                            
            if(!verifyUserExists){
                throw new AppError(`Usuário com o id ${id} não encontrado`, StatusCodes.NOT_FOUND)
            }

            const updateUser: Partial<{ email: string, password: string, firstName: string, lastName: string}> = {};
            
            if (data.email && data.email) {
                const verifyEmailExists = await this.findByEmail(data.email);
                if (verifyEmailExists) {
                    throw new AppError("Já existe um usuário com esse e-mail", StatusCodes.CONFLICT);
                }
            }
            
            if(data.password){
                if (!data.actualPassword) {
                    throw new AppError("Caso queira alterar para uma nova senha, é obrigatório digitar a senha atual.", StatusCodes.BAD_REQUEST)
                }
                
                const isValidPassword = await comparePasswords(data.actualPassword, verifyUserExists.password);                
                                        
                if(isValidPassword){
                    password = await encryptPassword(data.password);
                    updateUser.password = password;
                }else{
                     throw new AppError("Senha atual incorreta", StatusCodes.NOT_ACCEPTABLE)
                }
            }

            if(data.firstName) updateUser.firstName = data.firstName
            if(data.lastName) updateUser.lastName = data.lastName
    
            const update = prisma.user.update({
                where:{
                    id
                },
                data: updateUser,      
            });
                
            return update;
        },

        async delete(id: string){
                const verifyUserExists = await this.findById(id);
                                
                if(!verifyUserExists){
                    throw new AppError(`Usuário com o id ${id} não encontrado`, StatusCodes.NOT_FOUND)
                }

                const deleteUser = await prisma.user.delete({
                    where: {id},
                });

                if(!deleteUser){
                    throw new AppError( "Erro ao deletar usuário", StatusCodes.BAD_REQUEST)
                }
        
                return deleteUser;
        }
    
}