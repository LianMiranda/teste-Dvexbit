import { PrismaClient } from "@prisma/client"
import { verifyDate } from "../../utils/dataValidate";
import { AppError } from "../../utils/appError";

const prisma = new PrismaClient();

export const TaskService = {
    create: async (data:{titulo: string,  descricao: string, dataDaAtividade: string, userId: string}) => {
        const validDate = verifyDate(data.dataDaAtividade);
            
        if(!validDate){
           throw new AppError("A data deve estar no formato YYYY-MM-DD", 400)
        }

        try {
            const task = await prisma.task.create({
                data: data
            }); 

            return task;

        } catch (error) {
            console.error("Erro interno ao criar task:", error);
            throw new AppError("Erro interno ao criar tarefa", 500);
        }
    },

    findAll: async () => {
        try {
            const tasks = await prisma.task.findMany();

            return tasks;
        } catch (error) {
            console.error("Erro interno ao buscar tasks:", error);
            throw new AppError("Erro interno ao buscar tasks", 500);
        }
    },

    findById: async (id: string) => {
        try {
            const task = await prisma.task.findUnique({
                where:{id}
            });

            return task;
        } catch (error) {
            console.error("Erro interno ao buscar task:", error);
            throw new AppError("Erro interno ao buscar task", 500);
        }
    },

    update: async (id: string, data:{titulo: string, descricao: string, dataDaAtividade: string}) => {
        const updateTask: Partial<{ titulo: string, descricao: string, dataDaAtividade: string}> = {}

        console.log(data.titulo);
        
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

    delete: async (id: string) => {
        try {
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