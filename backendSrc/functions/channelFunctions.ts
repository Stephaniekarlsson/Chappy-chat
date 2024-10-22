import { MongoClient, Collection, ObjectId, InsertOneResult } from "mongodb";
import { ChannelModel } from "../models/ChannelModel.js";
import { connect } from '../connect.js'

async function createChannel(channel: ChannelModel): Promise<ObjectId | null> {
    const client: MongoClient = await connect(); 

    try {
        const db = client.db('ChappyApp'); 
        const col: Collection<ChannelModel> = db.collection<ChannelModel>('Channels'); 
        const result: InsertOneResult<ChannelModel> = await col.insertOne(channel); 
        return result.insertedId;

    } catch (error) {
        console.log('Error inserting channel', error);
        throw error; 

    } finally {
        await client.close(); 
    }
}

export { createChannel };
