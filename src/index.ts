import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'

import userRoute from './routes/userRoute'
import loginRoute from './routes/loginRoute'
import registerRoute from './routes/registerRoute'

const app = express()

app.use(cors({
    credentials : true,
}))


app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRoute)
app.use('/login', loginRoute)
app.use('/register', registerRoute)
const server = http.createServer(app)

server.listen(8080, () => {
    console.log('Sever running on port 8080')
})