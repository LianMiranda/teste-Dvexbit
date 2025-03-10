import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/appError";

const prisma = new PrismaClient();

export const UserService = {
    create: async (data:{email: string, password: string, firstName: string, lastName: string}) =>{
        try {
            const user = await prisma.user.create({
                data: data,
                select: {
                    email: true,
                    firstName: true,
                    lastName: true,
                }
            })

            return user;
        } catch (error) {
            console.error("Erro interno ao criar usuário:", error);
            throw new AppError("Erro interno ao criar usuário", 500);
        }
    },

    findAll: async () => {
        try {
            const users = await prisma.user.findMany({
                include: {
                    tasks: true,
                }
            });
    
            return users;
        } catch (error) {
            console.error("Erro interno ao bucar usuários:", error);
            throw new AppError("Erro interno ao bucar usuários", 500);
        }
    },

    findById: async (id: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: {id},
                include: {
                    tasks: true,
                }
            });
    
            return user;
        } catch (error) {
            console.error("Erro interno ao bucar usuários:", error);
            throw new AppError("Erro interno ao bucar usuários", 500);
        }
    },

    findByEmail: async (email: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: {email},
            });
    
            return user;
        } catch (error) {
            console.error("Erro interno ao bucar usuários:", error);
            throw new AppError("Erro interno ao bucar usuários", 500);
        }
    },

     update: async (id: string, data:{email: string, password: string, firstName: string, lastName: string}) => {
            const updateUser: Partial<{ email: string, password: string, firstName: string, lastName: string}> = {}
    
            
            if(data.email) updateUser.email = data.email;
            if(data.password) updateUser.password = data.password
            if(data.firstName) updateUser.firstName = data.firstName
            if(data.lastName) updateUser.lastName = data.lastName
    
            try {
                const update = prisma.user.update({
                    where:{
                        id
                    },
                    data: updateUser,      
                });
                 
                return update;
            } catch (error) {
                console.error("Erro interno ao atualizar task:", error);
                throw new AppError("Erro interno ao atualizar task", 500);
            }
        },

    delete: async (id: string) => {
        try {
            const deleteUser = await prisma.user.delete({
                where: {id},
            });
    
            return deleteUser;
        } catch (error) {
            console.error("Erro interno ao bucar usuários:", error);
            throw new AppError("Erro interno ao bucar usuários", 500);
        }
    }
    
}