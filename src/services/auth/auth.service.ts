import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/appError";
import { UserService } from "../user/user.service"
import { compare } from "bcrypt";
import { genToken } from "../../utils/genToken";

interface ILogin{
    email:string
    password:string
}

export const AuthService ={
    async login(data:ILogin){

        if(!data.email && !data.password){
            throw new AppError("Verifique os campos", StatusCodes.BAD_REQUEST);
        }
        const userExists = await UserService.findByEmail(data.email);

        if(!userExists){
            throw new AppError("Verifique os campos e tente novamente", StatusCodes.BAD_REQUEST);
        }

        const isValidPassword = await compare(data.password, userExists.password);

        if(!isValidPassword){
            throw new AppError("Email ou senha incorretos", StatusCodes.BAD_REQUEST);
        }

        const token = genToken(userExists, "2h");

        return token;
    }
}