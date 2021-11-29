const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')
const next = require('next')

const { errorHandler } = require('./middlewares/errorHandler')

const AccountRouter = require('./routes/account')
const RequestRouter = require('./routes/api')

const cors = require('cors')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: 'frontend' })
const handle = app.getRequestHandler()

app.prepare().then( () => {
  const server = express()
  
    // brew services start mongodb/brew/mongodb-community
  const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/find-a-friend'
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  server.use(express.static('dist'))

  server.use(express.json())
  server.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 360000,
  }))

  server.use(cors())

  // server.get('/', (req, res) => {
  //   res.send('Welcome to Find-A-Friend\'s Backend!')
  // })

  server.use('/api', RequestRouter)
  server.use('/account', AccountRouter)

  server.use(errorHandler)

  server.get('/favicon.ico', (req, res) => {
    res.status(404).send()
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, () => {
    console.log('Listening on port 3000')
  })
})
