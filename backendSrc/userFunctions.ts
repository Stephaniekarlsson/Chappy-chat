import { MongoClient, Collection, ObjectId, InsertOneResult } from "mongodb";
import { UserModel } from "./models/userModel.js";
import { connect } from "./getDb.js";

async function createUser(user: UserModel): Promise<ObjectId | null>{
    const [col, client]: [Collection<UserModel>, MongoClient] = await connect()

    try {
        const result: InsertOneResult<UserModel> = await col.insertOne(user)
        return result.insertedId
    } catch (error) {
        console.log('Error insert user', error);
        throw error
    } finally {
        await client.close()
    }
}

export { createUser }