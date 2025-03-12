import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/appError";
import { UserService } from "../user/user.service"
import { compare } from "bcrypt";
import { sign } from "./token.service";

interface ILogin{
    email:string
    password:string
}

export const AuthService ={
    async login(data:ILogin){

        if(!data.email.trim() || !data.password.trim()){
            throw new AppError("Verifique se os campos foram preenchidos", StatusCodes.UNPROCESSABLE_ENTITY);
        }
        const userExists = await UserService.findByEmail(data.email);

        if(!userExists){
            throw new AppError("Credênciais inválidas", StatusCodes.BAD_REQUEST);
        }

        const isValidPassword = await compare(data.password, userExists.password);

        if(!isValidPassword){
            throw new AppError("Credênciais inválidas", StatusCodes.BAD_REQUEST);
        }

        const user = {
            id: userExists.id,
            email: userExists.email
        }

        const token = sign(user);

        return token;
    }
}