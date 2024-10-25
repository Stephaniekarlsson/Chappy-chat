import express, { Router, Response, Request } from 'express'
import { getUsers, getUserCollection } from '../connect.js'
import { WithId, ObjectId } from 'mongodb'
import { UserModel, EditUserModel } from '../models/userModel.js'
import { createUser, getUserById } from '../functions/userFunctions.js'
import { validateUser, validateEditUser } from '../validation/validateFunctions.js'
import jwt from 'jsonwebtoken'
import { validateLogin } from '../validation/validateLogin.js'

const router: Router = express.Router()
const { sign } = jwt



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

router.get('/search-users', async (req: Request, res: Response) => {
    try {
        const { username } = req.query;

        if (!username || (username as string).trim() === '') {
        res.sendStatus(400);
        }

        const searchTerms = (username as string).split(' ').map(term => term.trim());
        
        const users = await getUsers();
        const filteredUsers = users.filter(user => 
            searchTerms.some(term => user.username.match(new RegExp(term, 'i')))
        );

        if (filteredUsers.length === 0) {
        res.sendStatus(404); 
        }

        res.status(200).json(filteredUsers); 

    } catch (error) {
        console.error('Error searching for users:', error);
        res.sendStatus(500); 
    }
});

router.post('/login', async (req: Request, res: Response) => {
    console.log("entered POST/login");
  
    if( !process.env.SECRET ) {
      res.sendStatus(500)
      return
    }
    
    console.log('Body är: ', req.body)
    const userId = await validateLogin(req.body.username, req.body.password)
    
    console.log('user id: ', userId)
    
    if( !userId ) {
      res.status(401).send({
        "error": "Unauthorized",
        "message": "You are not authorized to access this resource."
      })
      return
    }

    const user = await getUserById(userId); 
    
    if (!user) {
      res.status(404).send({
        "error": "User not found",
        "message": "No user found with the given ID."
      });
      return;
    }
    
    const payload = {
      userId
    }
    const token: string = sign(payload, process.env.SECRET)
    res.send({ 
        jwt: token,
        username: user.username,
        image: user.image || '',
     })
})

router.post('/', validateUser, async (req: Request, res: Response) => {
    const newUser: UserModel = {
        ...req.body,
        date_of_creation: new Date().toISOString()
    };

    try {
        await createUser(newUser); 
        res.sendStatus(201); 
    } catch (error) {
        console.log('Error inserting user', error);
        res.sendStatus(400); 
    }
});

router.put('/:id', validateEditUser, async (req: Request, res: Response) => {

    const userId: string = req.params.id;
    const updatedUser: EditUserModel = req.body;

    try {
        if (!ObjectId.isValid(userId)) {
            res.sendStatus(400); 
            return
        }

        const col = await getUserCollection(); 
        const result = await col.updateOne(
            { _id: new ObjectId(userId) }, 
            { $set: updatedUser } 
        );

        if (result.matchedCount === 0) {
            res.sendStatus(404);
            return
        }
        res.sendStatus(200); 

    } catch (error) {
        console.log('Error updating user', error);
        res.sendStatus(500); 
    }
});

router.delete('/:id', async (req: Request, res: Response) => {

    const userId: string = req.params.id;

    try {
        if (!ObjectId.isValid(userId)) {
            res.sendStatus(400); 
        }
        
        const col = await getUserCollection(); 
        const deleteResult = await col.deleteOne(
            { _id: new ObjectId(userId) } 
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

export { router }