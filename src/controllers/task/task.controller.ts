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
    create: async (req: Request<{}, {}, ITask>, res: Response, next: NextFunction) => {
        try {
            const data: ITask = req.body;

            if(!data.titulo || data.titulo.trim() == ""){
                res.status(StatusCodes.BAD_REQUEST).json({message: "Verifique se os campos foram preenchidos corretamente"});
                return;
            }

            if(!data.dataDaAtividade || data.dataDaAtividade.trim() === ""){
                res.status(StatusCodes.BAD_REQUEST).json({message: "Verifique se os campos foram preenchidos corretamente"});
                return;
            }

            const task = await taskService.create(data);
          
            res.status(StatusCodes.CREATED).json({message: "Tarefa criada com sucesso", task});
            
        } catch (error) {
           next(error)
        }
    },

    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getTasks = await taskService.findAll()

            if(getTasks.length === 0){
                res.status(StatusCodes.NOT_FOUND).json({message: "Nenhuma tarefa encontrada"});
                return;
            }

            res.status(StatusCodes.OK).json({tasks: getTasks});
        } catch (error) {
            next(error)
        }
    },

    findById:async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            
            const getTask = await taskService.findById(id)

            if(!getTask){
                res.status(StatusCodes.NOT_FOUND).json({message: "Nenhuma tarefa encontrada"});
                return;
            }

            res.status(StatusCodes.OK).json({task: getTask});
        }  catch (error) {
            next(error)
        }
    },

    update:async (req: Request<{id: string}, {}, ITask>, res: Response, next: NextFunction) => {
        try{
            const id = req.params.id;
            const verifyId = await taskService.findById(id);
            
            if(!verifyId){
                res.status(StatusCodes.NOT_FOUND).json({message: `Tarefa com o id ${id} não encontrada`});
                return;
            }
            
            const data: ITask = req.body;
            
            console.log(data);
            
            if(!data.titulo && !data.descricao && !data.dataDaAtividade){
                res.status(StatusCodes.BAD_REQUEST).json({message: "Informe ao menos um valor para atualizar"});
                return;
            }

            const updateTask = await taskService.update(id, data);
            res.status(StatusCodes.OK).json({message: "Tarefa atualizada com sucesso!", task: updateTask});

        }  catch (error) {
            next(error)
        }
    },

    delete:async (req: Request, res: Response, next: NextFunction) => {
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
            next(error)
        }
    }

}