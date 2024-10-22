import { MongoClient, Collection, ObjectId, InsertOneResult } from "mongodb";
import { UserModel } from "../models/userModel.js";
import { connect } from '../connect.js'

async function createUser(user: UserModel): Promise<ObjectId | null> {
    const client: MongoClient = await connect(); 

    try {
        const db = client.db('ChappyApp'); 
        const col: Collection<UserModel> = db.collection<UserModel>('Users'); 
        const result: InsertOneResult<UserModel> = await col.insertOne(user); 
        return result.insertedId;

    } catch (error) {
        console.log('Error inserting user', error);
        throw error; 

    } finally {
        await client.close(); 
    }
}

export { createUser };
