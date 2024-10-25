import express, { Router, Response, Request } from 'express'
import { WithId, ObjectId } from 'mongodb'
import { ChannelModel } from '../models/ChannelModel.js'
import { getChannels, getChannelsCollection } from '../connect.js'
import { createChannel, createChannelMessage } from '../functions/channelFunctions.js'
import { validateChannel } from '../validation/validateFunctions.js'
import { getMessagesByChannelId } from '../functions/channelFunctions.js'
import { MessageModel } from '../models/messageModel.js'


const router: Router = express.Router()

router.get('/', async (_, res: Response) => {
    try {
        const allChannels: WithId<ChannelModel>[] = await getChannels()

        if (allChannels.length === 0){
            res.sendStatus(404)
        } 

        res.status(200).send(allChannels);
    } catch (error) {
        console.error('Error fetching channels:', error);
        res.sendStatus(500)
    }
})

router.get('/search-channels', async (req: Request, res: Response) => {
    try {
        const { channel_name } = req.query;

        if (!channel_name || (channel_name as string).trim() === '') {
        res.sendStatus(400);
        }

        const searchTerms = (channel_name as string).split(' ').map(term => term.trim());
        
        const channels = await getChannels();
        const filteredChannels = channels.filter(channels => 
            searchTerms.some(term => channels.channel_name.match(new RegExp(term, 'i')))
        );

        if (filteredChannels.length === 0) {
        res.sendStatus(404); 
        }

        res.status(200).json(filteredChannels); 

    } catch (error) {
        console.error('Error searching for channels:', error);
        res.sendStatus(500); 
    }
});

router.post('/', validateChannel, async (req: Request, res: Response) => {
    const newChannel: ChannelModel = {
        ...req.body,
    };

    try {
        await createChannel(newChannel); 
        res.sendStatus(201); 
    } catch (error) {
        console.log('Error inserting channel', error);
        res.sendStatus(400); 
    }
});

router.put('/:id', validateChannel, async (req: Request, res: Response) => {

    const channelId: string = req.params.id;
    const updatedChannel: ChannelModel = req.body;

    try {
        if (!ObjectId.isValid(channelId)) {
            res.sendStatus(400); 
            console.log('Invalid ID');
            return
        }

        const col = await getChannelsCollection()
        const result = await col.updateOne(
            { _id: new ObjectId(channelId) }, 
            { $set: updatedChannel } 
        );

        if (result.matchedCount === 0) {
            res.sendStatus(404);
            console.log('No match found for the provided ID:', channelId);
            return
            
        }
        res.sendStatus(200); 

    } catch (error) {
        console.log('Error updating channel', error);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {

    const channelId: string = req.params.id;

    try {
        if (!ObjectId.isValid(channelId)) {
            res.sendStatus(400); 
        }
        
        const col = await getChannelsCollection(); 
        const deleteResult = await col.deleteOne(
            { _id: new ObjectId(channelId) } 
        );

        if (deleteResult.deletedCount === 0) {
            res.sendStatus(404);
        }
        res.sendStatus(200);

    } catch (error) {
        console.log('Error deleting user', error);
        res.sendStatus(500); 
    }
});

router.get('/:channelId/messages', async (req: Request, res: Response) => {
    const channelId = req.params.channelId;
    try {
        const messages = await getMessagesByChannelId(channelId); 
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.sendStatus(500);
    }
    
})

router.post('/:channelId/messages', async (req: Request, res: Response) => {
    const channelId = req.params.channelId;

    const newMessage: MessageModel = {
        channel_id: channelId,
        sender: req.body.sender,
        message: req.body.message,
        timestamp: new Date(), 
    };

    try {
        await createChannelMessage(newMessage);
        res.sendStatus(201); 
    } catch (error) {
        console.error('Error inserting message:', error);
        res.sendStatus(500); 
    }
});


export { router }