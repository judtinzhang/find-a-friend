const express = require('express')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

const router = express.Router()

const User = require('../models/user')

router.post('/authenticated', async (req, res, next) => {
  const { username } = req.body
  res.send((req.session.username === username).toString())
})

router.post('/signup', async (req, res, next) => {
  const {
    username,
    password,
    snapchat,
    instagram,
  } = req.body
  try {
    await User.create({
      username,
      password,
      snapchat,
      instagram,
    })
    res.send(`User ${username} Created!`)
  } catch (err) {
    next(new Error(err))
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user || user === undefined) {
      res.send(`User ${username} does not exist!`)
    }

    const passDB = user.password
    if (password === passDB) {
      req.session.username = username
      req.session.password = password
      res.send(`User ${username} has been logged in!`)
    } else {
      res.send(`User ${username} credentials were incorrect`)
    }
  } catch (err) {
    next(new Error(err))
  }
})

router.post('/update', isAuthenticated, async (req, res, next) => {
  const { username, snapchat, instagram } = req.body

  try {
    await User.updateOne({ username }, { $set: { snapchat } })
    await User.updateOne({ username }, { $set: { instagram } })
    res.send('Account Updated!')
  } catch (err) {
    next(new Error(err))
  }
})

router.post('/info', isAuthenticated, async (req, res, next) => {
  const { username } = req.body
  try {
    const user = await User.findOne({ username })
    res.send({ snapchat: user.snapchat, instagram: user.instagram })
  } catch (err) {
    next(new Error(err))
  }
})

router.post('/logout', async (req, res) => {
  const { username } = req.session
  req.session.username = null
  req.session.password = null
  res.send(`User ${username} has been logged out`)
})

module.exports = router
