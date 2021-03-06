const express = require('express')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

const router = express.Router()

const Request = require('../models/request')

router.post('/create', isAuthenticated, async (req, res, next) => {
  const {
    location,
    comment,
    time,
    shareSocials,
  } = req.body
  try {
    await Request.create(
      {
        requester: req.session.username,
        location,
        comment,
        time,
        shareSocials,
      },
    )
    res.send('Request created!')
  } catch (err) {
    next(new Error(err))
  }
})

router.get('/requests', isAuthenticated, async (req, res, next) => {
  try {
    const requests = await Request.find({ accepted: false, time: { $gte: Date.now() }, requester: { $nin: [req.session.username] } })
    res.send(requests)
  } catch (err) {
    next(new Error(err))
  }
})

router.post('/accept', isAuthenticated, async (req, res, next) => {
  const { _id } = req.body
  try {
    await Request.updateOne({ _id }, { $set: { acceptor: req.session.username, accepted: true } })
    res.send('Accepted!')
  } catch (err) {
    next(new Error(err))
  }
})

router.get('/history', isAuthenticated, async (req, res, next) => {
  try {
    const requests = await Request.find(
      {
        accepted: true,
        $or: [{ requester: { $in: [req.session.username] } }, { acceptor: { $in: [req.session.username] } }],
      },
    )
    res.send(requests)
  } catch (err) {
    next(new Error(err))
  }
})

module.exports = router
