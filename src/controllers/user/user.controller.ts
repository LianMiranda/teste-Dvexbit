import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "../../services/user/user.service";

interface IUser {
    email: string;
    password: string; 
    firstName: string;
    lastName: string;
}

export const UserController = {
    create: async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) => {
        const data = req.body;

        if(!data.email|| data.email.trim() === ""){
            res.status(StatusCodes.BAD_REQUEST).json("Verifique se os campos foram preenchidos corretamente");
            return;
        }
        if(!data.password|| data.password.trim() === ""){
            res.status(StatusCodes.BAD_REQUEST).json("Verifique se os campos foram preenchidos corretamente");
            return;
        }
        if(!data.firstName|| data.firstName.trim() === ""){
            res.status(StatusCodes.BAD_REQUEST).json("Verifique se os campos foram preenchidos corretamente");
            return;
        }
        if(!data.lastName|| data.lastName.trim() === ""){
            res.status(StatusCodes.BAD_REQUEST).json("Verifique se os campos foram preenchidos corretamente");
            return;
        }

        const verifyEmailExists = await UserService.findByEmail(data.email);

        if(verifyEmailExists){
            res.status(StatusCodes.CONFLICT).json({message: "Já existe um usuário com esse email"});
            return;
        }

        try {
            const user = await UserService.create(data);
            res.status(StatusCodes.OK).json({message: "Usuário criado com sucesso",user});
        } catch (error) {
            next(error)
        }
    },

    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await UserService.findAll();

            if(users.length === 0){
                res.status(StatusCodes.NOT_FOUND).json({message:"Nenhum usuário encontrado"})
                return;
            }

            res.status(StatusCodes.OK).json({users});

        } catch (error) {
            next(error)
        }
    },

    findById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;

            const user = await UserService.findById(id);

            if(!user){
                res.status(StatusCodes.NOT_FOUND).json({message:"Nenhum usuário encontrado"});
                return;
            }

            res.status(StatusCodes.OK).json({user});

        } catch (error) {
            next(error)
        }
    },

    update: async (req: Request<{id: string}, {}, IUser>, res: Response, next: NextFunction) => {
                const id = req.params.id;
                const verifyUser = await UserService.findById(id);
                
                if(!verifyUser){
                    res.status(StatusCodes.NOT_FOUND).json({message: `Usuário com o id ${id} não encontrado`});
                    return;
                }
                
                const data: IUser = req.body;
                                
                if(!data.email && !data.password && !data.firstName && !data.lastName){
                    res.status(StatusCodes.BAD_REQUEST).json({message: "Informe ao menos um valor para atualizar"});
                    return;
                }

                const verifyEmailExists = await UserService.findByEmail(data.email);

                if(verifyEmailExists){
                    res.status(StatusCodes.CONFLICT).json({message: "Já existe um usuário com esse email"});
                    return;
                }

                try{
                    const updateUser = await UserService.update(id, data);
                    res.status(StatusCodes.OK).json({message: "Usuário atualizado com sucesso!", task: updateUser});
                }  catch (error) {
                    next(error)
                }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
                try{
                    const id = req.params.id;
                    const verifyUser = await UserService.findById(id)

                    if(!verifyUser){
                        res.status(StatusCodes.NOT_FOUND).json({message: `Usuário com o id ${id} não encontrado`});
                        return;
                    }

                    const deleteUser = await UserService.delete(id);
                    
                    console.log("deleteUser ",deleteUser);
                    
                    if(!deleteUser){
                        res.status(StatusCodes.NOT_FOUND).json({message: "Erro ao deletar usuário"});
                        return;
                    }

                    res.status(StatusCodes.OK).json({message: `Usuário com o id ${id} deletado com sucesso!`});
                } catch (error) {
                    next(error)
                }
    }       
}