import { ObjectId } from "mongodb";

export interface UserModel {
    _id: ObjectId
    username: string;
    password: string;
    image: string;
    date_of_creation: number;
    }

export interface EditUserModel {
    username: string;
    password: string;
    image: string;
}