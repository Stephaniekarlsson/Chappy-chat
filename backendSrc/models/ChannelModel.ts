import { ObjectId } from "mongodb";

export interface ChannelModel {
    _id: ObjectId
    channel_name: string
    }