const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  instagram: { type: String },
  snapchat: { type: String },
})

module.exports = model('User', userSchema)
