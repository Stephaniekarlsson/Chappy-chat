import { DmModel } from "../models/dmModel.js";
import { ObjectId, MongoClient, Collection, InsertOneResult } from "mongodb";
import { connect } from "../connect.js";

async function createDmMessage(message: DmModel): Promise<ObjectId | null> {
  const client: MongoClient = await connect(); 

  try {
      const db = client.db('ChappyApp'); 
      const col: Collection<DmModel> = db.collection<DmModel>('Dm-messages'); 
      const result: InsertOneResult<DmModel> = await col.insertOne(message); 
      return result.insertedId;

  } catch (error) {
      console.log('Error inserting message', error);
      throw error; 

  } finally {
      await client.close(); 
  }
}

export { createDmMessage }