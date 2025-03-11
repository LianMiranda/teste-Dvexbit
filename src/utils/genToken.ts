import jwt, { SignOptions } from "jsonwebtoken";

export async function genToken(user: { id: string; email: string }, expiresIn: string) {
    const secret = process.env.SECRET;

    if (!secret) {
        throw new Error("A variável de ambiente SECRET não está definida.");
    }

    const options: SignOptions = {expiresIn};
    
    const token =jwt.sign({ id: user.id, email: user.email }, secret, options);    
    
    return token;
}