const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: String,
    country: String,
    born: Number
})

module.exports = mongoose.model('Author', authorSchema)