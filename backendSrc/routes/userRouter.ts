import express, { Router, Response } from 'express'
import { getUsers } from '../getDb.js'
import { WithId } from 'mongodb'
import { UserModel } from '../models/userModel.js'

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


export { router }