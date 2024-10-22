import { ObjectId } from "mongodb";

export interface UserModel {
    _id: ObjectId
    username: string;
    password: string;
    image: string;
    date_of_creation: Date;
    }

export interface EditUserModel {
    _id: ObjectId
    username: string;
    password: string;
    image: string;
}

export interface Payload {
    userId: string;
	iat: number;
}