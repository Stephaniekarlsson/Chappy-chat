import Joi from "joi";
import { EditUserModel, UserModel } from "../models/userModel.js";

export const userModelSchema = Joi.object<UserModel>({
    _id: Joi.string().required,
    username: Joi.string()
    .min(8)
    .max(20)
    .pattern(/^[a-zA-Z0-9_-åäöÅÄÖ]*$/)
    .required(),
    password: Joi.string()
    .min(8) 
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-ZÅÄÖa-zåäö\d@$!%*?&]{8,}$/)
    .required(),
    image: Joi.string()
    .uri()
    .optional(),
    date_of_creation: Joi.number()
    .integer()
})

export const editUserModelSchema = Joi.object<EditUserModel>({
    _id: Joi.string().required,
    username: Joi.string()
    .min(8)
    .max(20)
    .pattern(/^[a-zA-Z0-9_-åäöÅÄÖ]*$/)
    .optional(),
    password: Joi.string()
    .min(8) 
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-ZÅÄÖa-zåäö\d@$!%*?&]{8,}$/)
    // min 1 liten bokstav
    // min 1 stor
    // min 1 siffra
    // min 1 specialtecken
    // min 8 långt
    .optional(),
    image: Joi.string()
    .uri()
    .optional(),
})
