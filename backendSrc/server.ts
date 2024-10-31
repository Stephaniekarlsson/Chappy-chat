import express, { Express } from 'express'
import { router as userRouter } from './routes/userRouter.js'
import { router as channelRouter} from './routes/channelRouter.js'
import { router as dmRouter } from './routes/dmRouter.js'


const app: Express = express()
const port: number = Number(process.env.PORT || 4657)


// Middleware
app.use('/', express.static('dist/'))
app.use('/', express.json())

// Router middleware
app.use('/api/users', userRouter)
app.use('/api/channels', channelRouter)
app.use('/api/direct-messages', dmRouter)


// Eventuella routes


// Starta servern
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})