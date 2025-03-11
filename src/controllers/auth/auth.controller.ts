import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "../../services/auth/auth.service";

interface ILogin{
    email:string
    password:string
}
export const AuthController ={
    async login(req: Request<{}, {}, ILogin>, res: Response, next: NextFunction){
        try {
            const data = req.body;
            const login = await AuthService.login(data);

            res.status(StatusCodes.OK).json({token: login})
        } catch (error) {
            next(error)
        }
        
    }
}