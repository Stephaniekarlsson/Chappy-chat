import { ObjectId } from "mongodb"

export interface DmModel {
  _id?: ObjectId
  sender: string
  receiver: string
  message: string
  timestamp: Date
  }