const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')
const path = require('path')
const { errorHandler } = require('./middlewares/errorHandler')

const AccountRouter = require('./routes/account')
const RequestRouter = require('./routes/api')

const cors = require('cors')

const app = express()


// brew services start mongodb/brew/mongodb-community
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/find-a-friend'
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))

app.use(express.json())
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 360000,
}))

app.use(cors())

app.get('/', (req, res) => {
  res.send('Welcome to Find-A-Friend\'s Backend!')
})

app.use('/api', RequestRouter)
app.use('/account', AccountRouter)

app.use(errorHandler)

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
