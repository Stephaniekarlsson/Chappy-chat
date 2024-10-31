import { MongoClient, Collection, ObjectId, InsertOneResult } from "mongodb";
import { ChannelModel } from "../models/ChannelModel.js";
import { connect } from '../connect.js'
import { getChannelMessagesCollection } from "../connect.js";
import { MessageModel } from "../models/messageModel.js";

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

    const getMessagesByChannelId = async (channelId: string) => {
        const messagesCollection = await getChannelMessagesCollection();

        console.log(`Fetching messages for channel ID: ${channelId}`);
        const messages = await messagesCollection.find({ channel_id: channelId }).toArray();
        
        console.log('Fetched messages:', messages);
        return messages;
};

async function createChannelMessage(message: MessageModel): Promise<ObjectId | null> {
    const client: MongoClient = await connect(); 

    try {
        const db = client.db('ChappyApp'); 
        const col: Collection<MessageModel> = db.collection<MessageModel>('Channel-messages'); 
        const result: InsertOneResult<MessageModel> = await col.insertOne(message); 
        return result.insertedId;

    } catch (error) {
        console.log('Error inserting message', error);
        throw error; 

    } finally {
        await client.close(); 
    }
}


export { createChannel, getMessagesByChannelId, createChannelMessage };
