import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "../../services/user/user.service";

interface IUser {
    email: string;
    password: string; 
    firstName: string;
    lastName: string;
}

interface IUserUpdate extends IUser {
    actualPassword: string;
}

export const UserController = {
     async create (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) {
        const data = req.body;
        try {            
            const user = await UserService.create(data);
            res.status(StatusCodes.OK).json({message: "Usuário criado com sucesso",user});
        } catch (error) {
            next(error)
        }
    },

    async findAll (req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.findAll();
            res.status(StatusCodes.OK).json({users});
        } catch (error) {
            next(error)
        }
    },

    async findById(req: Request, res: Response, next: NextFunction){
        const id = req.params.id;

        try {
            const user = await UserService.findById(id);
            res.status(StatusCodes.OK).json({user});
        } catch (error) {
            next(error)
        }
    },

    async update (req: Request<{id: string}, {}, IUserUpdate>, res: Response, next: NextFunction) {
            const id = req.params.id; 
            const data: IUserUpdate = req.body;

            try{
                const updateUser = await UserService.update(id, data);
                res.status(StatusCodes.OK).json({message: "Usuário atualizado com sucesso!", task: updateUser});
            }  catch (error) {
                next(error)
            }
    },

    async delete (req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        try{ 
            await UserService.delete(id);
            res.status(StatusCodes.OK).json({message: `Usuário com o id ${id} deletado com sucesso!`});
        } catch (error) {
            next(error)
        }
    }       
}