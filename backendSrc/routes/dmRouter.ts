import express, { Router, Response, Request } from 'express'
import { DmModel } from '../models/dmModel'
import { getDmMessagesCollection } from '../connect.js'
import { createDmMessage } from '../functions/dmFunctions.js'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const { sender, receiver } = req.query;

  if (!sender || !receiver) {
    res.status(400).send({ message: "Sender and receiver are required" });
  }

  try {
    const collection = await getDmMessagesCollection(); 

    const messages = await collection
      .find({
        $or: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender }
        ]
      })
      .sort({ timestamp: 1 }) 
      .toArray();
    res.status(200).send(messages)

  } catch (error) {
    console.error('Error fetching DM messages:', error);
    res.sendStatus(500)
  }
});

router.get('/:username', async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const collection = await getDmMessagesCollection();

    const senders = await collection.distinct('sender', { receiver: username });
    const receivers = await collection.distinct('receiver', { sender: username });

    const dmUsers = Array.from(new Set([...senders, ...receivers])); 
    res.status(200).send(dmUsers);

  } catch (error) {
    console.error('Error fetching DM users:', error);
    res.status(500)
  }
});


router.post('/', async (req: Request, res: Response) => {
  const { sender, receiver, message } = req.body;

  if (!sender || !receiver || !message) {
    res.status(400)
  }

  const newMessage: DmModel = {
    sender,
    receiver,
    message,
    timestamp: new Date(), 
  };

  try {
      await createDmMessage(newMessage);
      res.status(201).send({
          message: 'Message created successfully'
      })

  } catch (error) {
      console.error('Error inserting message:', error);
      res.status(500).send({
          error: 'Failed to create message'
      }); 
  }
});

router.delete('/username/:username', async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const collection = await getDmMessagesCollection();

    const deleteResult = await collection.deleteMany({
      $or: [
        { sender: username },
        { receiver: username }
      ]
    });

    if (deleteResult.deletedCount === 0) {
      res.status(200).send({ message: 'No messages found from ${username}' });
      return
    }

    res.status(200).send({ message: 'All messages from ${username} deleted successfully' });
    return

  } catch (error) {
    console.error('Error deleting DM messages:', error);
    res.status(500).send({ error: 'Failed to delete messages' });
  }
});



export { router}