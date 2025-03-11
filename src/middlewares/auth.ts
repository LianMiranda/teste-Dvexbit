import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { verify } from "../services/auth/token.service";


export async function auth(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new AppError("Token não fornecido ou inválido", 401))
        }
            const token = authHeader.split(" ")[1];

            await verify(token);
     
            return next();
        
    } catch (error) {
        return next(new AppError("Token inválido", 403))
    }
}

