import Joi from "joi";
import { ChannelModel } from "../models/ChannelModel";

export const channelModelSchema = Joi.object<ChannelModel>({
    channel_name: Joi.string()
    .min(3)
    .max(25)
    .pattern(/^[a-zA-ZåäöÅÄÖ0-9 !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/)
    .required(),
    isLocked: Joi.boolean().required(),
})