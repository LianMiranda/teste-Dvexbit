import { Request, Response, NextFunction } from "express";
import {StatusCodes} from 'http-status-codes'
import { verifyDate } from "../../utils/dataValidate";
import { TaskService } from "../../services/task/task.service";
import { UserService } from "../../services/user/user.service";

interface ITask {
    titulo: string;
    descricao: string;
    dataDaAtividade: string;
    userId: string;
}

//TODO REMOVER REGRAS DE NEGOCIO DO CONTROLLER 
export const TaskController = {
    create: async (req: Request<{}, {}, ITask>, res: Response, next: NextFunction) => {
        const data: ITask = req.body;

        try {
            const task = await TaskService.create(data);
    
            res.status(StatusCodes.CREATED).json({message: "Tarefa criada com sucesso", task});
            
        } catch (error) {
           next(error)
        }
    },

    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getTasks = await TaskService.findAll()

            res.status(StatusCodes.OK).json({tasks: getTasks});
        } catch (error) {
            next(error)
        }
    },

    findById:async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const getTask = await TaskService.findById(id)

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
        const id = req.params.id; 
        const data: ITask = req.body;

        try{
            const updateTask = await TaskService.update(id, data);
            res.status(StatusCodes.OK).json({message: "Tarefa atualizada com sucesso!", task: updateTask});
        }  catch (error) {
            next(error)
        }
    },

    delete:async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        try{
            await TaskService.delete(id);

            res.status(StatusCodes.OK).json({message: `Tarefa com o id ${id} deletada com sucesso!`});
        } catch (error) {
            next(error)
        }
    }

}