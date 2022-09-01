import express, { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import characterRouter from './controllers/characterRouter.js'
import roomRouter from './controllers/roomRouter.js'
import roomUserRouter from './controllers/roomUserRouter.js'
import userRouter from './controllers/userRouter.js'
import mapRouter from './controllers/mapRouter.js'
import tokenRouter from './controllers/tokenRouter.js'
import chatRouter from './controllers/chatRouter.js'

const app: Application = express()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(express.static('build'))
app.use('/api/v1.0/characters', characterRouter)
app.use('/api/v1.0/rooms', roomRouter)
app.use('/api/v1.0/users', userRouter)
app.use('/api/v1.0/roomusers', roomUserRouter)
app.use('/api/v1.0/maps', mapRouter)
app.use('/api/v1.0/tokens', tokenRouter)
app.use('/api/v1.0/chats', chatRouter)

export default app
