const { Schema, model } = require('mongoose')

const requestSchema = new Schema({
  requester: { type: String, required: true },
  acceptor: { type: String },
  location: { type: String, required: true },
  comment: { type: String },
  time: { type: Date, default: Date.now() },
  accepted: { type: Boolean, default: false },
  shareSocials: { type: Boolean, default: false },
})

module.exports = model('Request', requestSchema)
