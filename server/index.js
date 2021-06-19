const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const db = require('./db')
const guestRouter = require('./routes/guest-router')
const loginRouter = require('./routes/login-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/wedding/api', guestRouter)

app.use('/wedding/api', loginRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))