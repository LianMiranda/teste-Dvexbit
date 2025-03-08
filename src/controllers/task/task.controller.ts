import { Request, Response, NextFunction } from "express";
import {StatusCodes} from 'http-status-codes'
import { verifyDate } from "../../utils/dataValidate";
import { taskService } from "../../services/task/task.service";

interface ITask {
    titulo: string;
    descricao: string;
    dataDaAtividade: string;
}

export const TaskController = {
    create: async (req: Request<{}, {}, ITask>, res: Response) => {
        try {
            const data: ITask = req.body;
    
            if(data.titulo == undefined || data.titulo.trim() == ""){
                res.status(StatusCodes.BAD_REQUEST).json({message: "Verifique se os campos foram preenchidos corretamente"});
                return;
            }
    
            const validDate = verifyDate(data.dataDaAtividade);
    
            if(!validDate){
                res.status(StatusCodes.BAD_REQUEST).json({message: "A data deve estar no formato YYYY-MM-DD"});
                return;
            }
    
            const task = await taskService.create(data.titulo, data.descricao, data.dataDaAtividade);
    
        res.status(StatusCodes.CREATED).json({message: "Tarefa criada com sucesso", task});
    
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Erro inesperado no servidor"});
        }
    },

    findAll: async (req: Request, res: Response) => {
        try {
            const getTasks = await taskService.findAll()

            if(getTasks.length === 0){
                res.status(StatusCodes.NOT_FOUND).json({message: "Nenhuma tarefa encontrada"});
                return;
            }

            res.status(StatusCodes.OK).json({tasks: getTasks});
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Erro inesperado no servidor"});
        }
    },

    findById:async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            
            const getTask = await taskService.findById(id)

            if(!getTask){
                res.status(StatusCodes.NOT_FOUND).json({message: "Nenhuma tarefa encontrada"});
                return;
            }

            res.status(StatusCodes.OK).json({task: getTask});
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Erro inesperado no servidor"});
        }
    },

    update:async (req: Request, res: Response) => {
        
    },

    delete:async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            const verifyId = await taskService.findById(id)

            if(!verifyId){
                res.status(StatusCodes.NOT_FOUND).json({message: `Tarefa com o id ${id} não encontrada`});
                return;
            }
            const deleteTask = await taskService.delete(id)
        
            if(!deleteTask){
                res.status(StatusCodes.NOT_FOUND).json({message: "Nenhuma tarefa encontrada"});
                return;
            }

            res.status(StatusCodes.OK).json({message: `Tarefa com o id ${id} deletada com sucesso!`});
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Erro inesperado no servidor"});
        }
    }

}