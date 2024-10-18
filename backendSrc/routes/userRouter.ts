import express, { Router, Response, Request } from 'express'
import { getUserCollection, getUsers } from '../getDb.js'
import { ObjectId, WithId } from 'mongodb'
import { EditUserModel, UserModel } from '../models/userModel.js'
import { createUser } from '../userFunctions.js'

const router: Router = express.Router()

router.get('/', async (_, res: Response) => {
    try {
        const allUsers: WithId<UserModel>[] = await getUsers()

        if (allUsers.length === 0){
            res.sendStatus(404)
        } 

        res.status(200).send(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.sendStatus(500)
    }
})

router.post('/', async (req: Request, res: Response) => {
    const newUser: UserModel = req.body
    try {
        await createUser(newUser)
        res.sendStatus(201)
    } catch (error) {
        console.log('Error inserting user', error);
        res.sendStatus(400)
    }
})

router.put('/:id', async(req: Request, res: Response) => {
    const userId: string = req.params.id
    const updatedUser: EditUserModel = req.body

    try {

        if (!ObjectId.isValid(userId)) {
            res.sendStatus(400); 
        }
        
        const col = await getUserCollection()
        const result = await col.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updatedUser }
        )

        if (result.matchedCount === 0) {
            res.sendStatus(404)
        }

        res.sendStatus(200)
    } catch (error) {
        console.log('Error updating user', error);
        res.sendStatus(500)
    }
})

export { router }