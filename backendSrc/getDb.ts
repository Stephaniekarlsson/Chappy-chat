import { MongoClient, Db, Collection, WithId } from "mongodb";
import { UserModel } from "./models/userModel.js";

const conString: string | undefined = process.env.CONNECTION_STRING

async function connect(): Promise<[Collection<UserModel>, MongoClient]> {
	if( !conString ) {
		console.log('No connection string, check your .env file!')
		throw new Error('No connection string')
	}

	const client: MongoClient = await MongoClient.connect(conString)
	const db: Db = await client.db('ChappyApp')
	const col: Collection<UserModel> = db.collection<UserModel>('Users')
	return [col, client]
}

async function getUsers(): Promise<WithId<UserModel>[]> {
    try {
        const [col, client]: [Collection<UserModel>, MongoClient] = await connect()
        const result: WithId<UserModel>[] = await col.find({}).toArray()
        await client.close()
        return result
    } catch (error) {
        console.error('Error fetching users:', error)
        throw error
    }
}
export { getUsers}