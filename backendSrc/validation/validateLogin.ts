import {  WithId } from "mongodb"
import { UserModel } from "../models/userModel.js"
import { getUsers } from "../connect.js";


async function validateLogin(username: string, password: string): Promise <string | null> {
	
    let users: WithId<UserModel>[] = await getUsers()
	
	const matchingUser: WithId<UserModel> | undefined = users.find(user => user.username === username && user.password === password)

	if( matchingUser ) {
		return matchingUser.username
	}
	return null
}

export {validateLogin}