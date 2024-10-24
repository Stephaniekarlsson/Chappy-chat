import { MongoClient, Db, Collection, WithId } from "mongodb";
import { UserModel } from "./models/userModel.js";

const conString: string | undefined = process.env.CONNECTION_STRING

async function connect(): Promise<MongoClient> {
    if (!conString) {
        console.log('No connection string, check your .env file!');
        throw new Error('No connection string');
    }

    const client: MongoClient = await MongoClient.connect(conString);
    return client; 
}

async function getUsers(): Promise<WithId<UserModel>[]> {
    const client = await connect();
    let result: WithId<UserModel>[] = []; 

    try {
        const db: Db = client.db('ChappyApp'); 
        const col: Collection<UserModel> = db.collection<UserModel>('Users'); 
        result = await col.find({}).toArray(); 
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    } finally {
        await client.close(); 
    }
    return result; 
}

async function getUserCollection(): Promise<Collection<UserModel>> {
    const client = await connect(); 
    const db = client.db('ChappyApp'); 
    const col: Collection<UserModel> = db.collection<UserModel>('Users'); 
    return col; 
}


export { connect, getUsers, getUserCollection}