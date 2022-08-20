import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import characterRouter from './controllers/characterRouter.js'
import roomRouter from './controllers/roomRouter.js'
import userRouter from './controllers/userRouter.js'
import mapRouter from './controllers/mapRouter.js'
import tokenRouter from './controllers/tokenRouter.js'
import chatRouter from './controllers/chatRouter.js'

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(express.static('build'))
app.use('/api/characters', characterRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/users', userRouter)
app.use('/api/maps', mapRouter)
app.use('/api/tokens', tokenRouter)
app.use('/api/chats', chatRouter)

export default app
