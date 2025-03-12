import jwt, { SignOptions } from "jsonwebtoken";
import { AppError } from "../../utils/appError";

interface IJwtData{
    id: string,
    email:string
}

export async function sign(user: IJwtData){
    const secret = process.env.SECRET;

    if (!secret) throw new Error("A variável de ambiente SECRET não está definida.");
    
    const token = jwt.sign(user, secret, {expiresIn: "2h"});    
    
    return token;
}

export async function verify(token: string) {
    const secret = process.env.SECRET;

    if (!secret) throw new Error("A variável de ambiente SECRET não está definida.");

    try {
        const decoded = jwt.verify(token, secret);

        if(typeof decoded === 'string'){
            throw new AppError("Token inválido", 401)
        }

        return decoded;
    } catch (error) {
       throw new AppError("Token inválido", 401)
    }
}