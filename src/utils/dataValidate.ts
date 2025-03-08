import validator from "validator"

export const verifyDate = (date: string) => {
    try {
        const isValid = validator.isDate(date, {format: "YYYY-MM-DD", strictMode: true});
    
        if(!isValid){
           return false     
        }
    
        return true;
    } catch (error) {
        return error;
    }
}