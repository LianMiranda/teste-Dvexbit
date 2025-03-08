import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const taskService = {
    create: async (titulo: string,  descricao: string, dataDaAtividade: string) => {
        try {
            const task = await prisma.task.create({
                data: {
                    titulo: titulo,
                    descricao: descricao, 
                    dataDaAtividade: dataDaAtividade
                }
            }); 

            return task;

        } catch (error) {
            console.error("Erro ao criar task:", error);
            throw error;
        }
    },

    findAll: async () => {
        try {
            const tasks = await prisma.task.findMany();

            return tasks;
        } catch (error) {
            console.error("Erro ao buscar tasks:", error);
            throw error;
        }
    },

    findById: async (id: string) => {
        try {
            const task = await prisma.task.findUnique({
                where:{id}
            });

            return task;
        } catch (error) {
            console.error("Erro ao buscar tasks:", error);
            throw error;
        }
    },

    delete: async (id: string) => {
        try {
            const deleteTask = await prisma.task.delete({
                where:{id}
            });
                        
            return deleteTask;
        } catch (error) {
            console.error("Erro ao buscar tasks:", error);
            throw error;
        }
    }
}