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
    }
}