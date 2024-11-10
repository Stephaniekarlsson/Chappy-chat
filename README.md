
# Chappy chat app

A chat application whit functions for channels och dm's. Express, MongoDB, jwt. 

## Technologies
- **Backend:** Express.js
- **Database:** MongoDB
- **Autentisistion:** JWT
- **API:** RESTful API
- **Other:** TypeScript

### REST Users: 
| Method      | URL | body     | Response     |
| :----:      |    :----   |      :----   |          :--- |
| GET      | /api/users       |-| 200 OK med a list of users (JSON) or 404 if no users found  |
| GET  | /api/users/search-users        |{ "username": "search_term" }| 200 OK with a list of users matching the searchterm (JSON), 404 if no match, or 400 if username is missinng or empty in the request  |
| POST  | /api/users/login  |{ "username": "your_username", "password": "your_password" }| 200 OK with { "jwt": "token_string", "user": { "_id": "user_id", "username": "username", "image": "profile_image_url" } } when successful authorisation, or 401 Unauthorized if authorisation fails.     |
| POST  | /api/users        |{ "username": "username", "password": "password",  "image": "optional_image_url" }| 201 Created with { "_id": "user_id", "username": "username", "image": "image_url", "date_of_creation": "creation_date" } if creation succeded, or 400 Bad Request if failed.    |
| PUT  | /api/users/:id        |{ "username": "string (optional)", "password": "string (optional)", "image": "string (optional)" }| 200 OK: User uptaded successfully. 400 Bad Request: Invalid id format or incomplete data. 404 Not Found: No user found with given id. 500 Internal Server Error    |
| DELETE  | /api/users/:id     |-| 200 OK: User deleted successfully. 400 Bad Request: invalid id. 404 Not Found: No user with given id found. 500 Internal Server Error    |



### REST Channels: 
| Method      | URL | body     | Response     |
| :----:      |    :----   |      :----   |          :--- |
|GET| /api/channels |-|- 200 OK: A list with all channels. 404 Not Found: No channel found. 500 Internal Server Error|
|GET| /api/channels/search-channels |-| 200 OK: a filtered list of channels. 400 Bad Request: if no channel_name specified or empty. 404 Not Found: No matching channels. 500 Internal Server Error|
|POST| /api/channels |{ "channel_name": "string", "image": "string" (optional), "isLocked": "boolean" }|201 Created: Channel created with success. 400 Bad Request: Something required is missing or wrong format. 500 Internal Server Error|
|PUT| /api/channels/:id | 	{ "channel_name": "string" (optional), "image": "string" (optional), "isLocked": "boolean" (optional) } | 200 OK: Channel updated successfully. 400 Bad Request: invalid id. 404 Not Found: No channel with given id. 500 Internal Server Error. |
|DELETE| /api/channels/:id |-| 200 OK: Channel deleted succesfully. 400 Bad Request: Invalid id. 404 Not Found: No channel whit given id. 500 Internal Server Error. |



### REST Channel Messages: 
| Method      | URL | body     | Response     |
| :----:      |    :----   |      :----   |          :--- |
|GET| /api/channels/:channelId/messages |-| 200 OK: List with messages of given channel. 500 Internal Server Error. |
|POST| /api/channels/:channelId/messages | { "sender": "user", "message": "Your message here" } | 201 Created: Message created successfully. 500 Internal Server Error. |
|DELETE| api/channels//:channelId/messages/:sender | 200 OK: Messege deleted succesfully (or no messages to delete). 400 Bad Request: No given channel id. 500 Internal Server Error. |


### REST Direct messages: 
| Method      | URL | body     | Response     |
| :----:      |    :----   |      :----   |          :--- |
|GET| /api/direct-messages |-| 200 OK: Messages fetched successfully. 400 Bad Request: If queryparameter of sender or receiver is missing.b500 Internal Server Error. |
|GET| /api/direct-messages/:username |-| 200 OK: List of dm users. 500 Internal Server Error. |
|POST| /api/direct-messages | { sender, receiver, message } | 201 Created:Message created successfully. 400 Bad Request: Sender, receiver or message is missing. 500 Internal Server Error. |
|DELETE| /api/direct-messages//username/:username | 200 OK: Messages deleted successfully (or if there's no messages). 500 Internal Server Error. |


## Interfaces: 

### UserModel:
|  _id     | username | password | image  | date_of_creation |
|  :----   | :----    | :----    | :----  |       :---       | 
| ObjectId |  string  |  string  | string |       Date       |

### EditUserModel:
|  _id     | username | password | image  |
|  :----   | :----    | :----    | :----  |
| ObjectId |  string  |  string  | string |

### Payload:
|  userId  |   iat   |
|  :----   |  :----  |
|  string  |  number |

### MessageModel:
|  channel_id  | sender | message | timestamp |
|    :----     | :----  |  :----  |  :----    |
|    string    | string | string  |    Date   |

### DmModel:
|  _id?    |  sender  | receiver | message  | timestamp |
|  :----   |  :----   |  :----   |  :----   |   :---    | 
| ObjectId |  string  |  string  |  string  |   Date    |

### ChannelModel:
|   _id    | channel_name |  image  | isLocked |
|  :----   |    :----     |  :----  |  :----   |
| ObjectId |    string    | string  | Boolean  |

Published webpage : https://chappy-chat-u1p5.onrender.com