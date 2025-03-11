import { PrismaClient } from "@prisma/client"
import { verifyDate } from "../../utils/dataValidate";
import { AppError } from "../../utils/appError";
import { StatusCodes } from "http-status-codes";
import { UserService } from "../user/user.service";

const prisma = new PrismaClient();
interface ITask {
    titulo: string;
    descricao: string;
    dataDaAtividade: string;
    userId: string;
}

export const TaskService = {
    async create (data:ITask){

        if(!data.titulo || data.titulo.trim() == ""){
            throw new AppError("Verifique se os campos foram preenchidos corretamente", StatusCodes.BAD_REQUEST)
        }
        if(!data.dataDaAtividade || data.dataDaAtividade.trim() === ""){
            throw new AppError("Verifique se os campos foram preenchidos corretamente", StatusCodes.BAD_REQUEST)
        }
        if(!data.userId || data.userId.trim() === ""){
            throw new AppError("Verifique se os campos foram preenchidos corretamente", StatusCodes.BAD_REQUEST)
        }

        const verifyUserExists = await UserService.findById(data.userId);
    
        if(!verifyUserExists){
           throw new AppError("Usuário com o id ${data.userId} não existe", StatusCodes.NOT_FOUND)
        }

        const validDate = verifyDate(data.dataDaAtividade);
            
        if(!validDate){
           throw new AppError("A data deve estar no formato YYYY-MM-DD", 400)
        }
    
        const task = await prisma.task.create({
            data: data
        }); 

        return task;
    },

     async findAll() {
            const tasks = await prisma.task.findMany();

            if(tasks.length === 0){
                throw new AppError("Nenhuma tarefa encontrada", StatusCodes.NOT_FOUND)
            }

            return tasks;
    },

    async findById(id: string) {
        const task = await prisma.task.findUnique({
            where:{id}
        });

        if(!task){
            throw new AppError("Nenhuma tarefa encontrada", StatusCodes.NOT_FOUND)
        }

        return task;
    },

    async update(id: string, data:ITask) {
        const updateTask: Partial<{ titulo: string, descricao: string, dataDaAtividade: string}> = {}

        const verifyTaskExists = await this.findById(id);
        
        if(!verifyTaskExists){
            throw new AppError("Nenhuma tarefa encontrada", StatusCodes.NOT_FOUND)
        }   

        if(!data.titulo && !data.descricao && !data.dataDaAtividade){
           throw new AppError("Informe ao menos um valor para atualizar", StatusCodes.BAD_REQUEST)
        }

        if(data.titulo) updateTask.titulo = data.titulo
        if(data.descricao) updateTask.descricao = data.descricao
        if(data.dataDaAtividade){
            const validDate = verifyDate(data.dataDaAtividade);
            
            if(!validDate){
                throw new AppError("A data deve estar no formato YYYY-MM-DD", 400)
            }

            updateTask.dataDaAtividade = data.dataDaAtividade
        }

        try {
            const update = prisma.task.update({
                where:{
                    id
                },
                data: updateTask,      
            });
             
            return update;
        } catch (error) {
            console.error("Erro interno ao atualizar task:", error);
            throw new AppError("Erro interno ao atualizar task", 500);
        }
    },

     async delete(id: string) {
        try {
            const verifyTaskExists = await this.findById(id);
        
            if(!verifyTaskExists){
                throw new AppError("Nenhuma tarefa encontrada", StatusCodes.NOT_FOUND)
            }   

            const deleteTask = await prisma.task.delete({
                where:{id}
            });
                        
            return deleteTask;
        } catch (error) {
            console.error("Erro interno ao deletar task:", error);
            throw new AppError("Erro interno ao deletar task", 500);
        }
    }
}