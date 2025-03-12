import bcrypt from "bcrypt"

export async function encryptPassword(password: string){
    const saltRonds = 10;
    const salt = await bcrypt.genSalt(saltRonds);

    const hash = bcrypt.hash(password, salt);

    return hash;
}

export async function comparePasswords(password: string, userPassword: string){
    const compare = await bcrypt.compare(password, userPassword);
    return compare;
}