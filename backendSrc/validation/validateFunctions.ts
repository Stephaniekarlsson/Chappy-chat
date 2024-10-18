import { userModelSchema, editUserModelSchema } from "./validateUsers.js";
import { Request, Response } from 'express';


const validateUser = async (req: Request, res: Response, next: Function) => {
    try {
        // Validera användardata
        await userModelSchema.validateAsync(req.body);
        next();
    } catch (error) {
        console.error('Validation error:', error);
        res.sendStatus(400); 
    }
};

const validateEditUser = async (req: Request, res: Response, next: Function) => {
    try {
        await editUserModelSchema.validateAsync(req.body)
        next()
    } catch (error) {
        console.log('Validation error', error);
        res.sendStatus(400)
    }
}

export { validateUser, validateEditUser}