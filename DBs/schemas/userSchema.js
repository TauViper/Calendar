const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    userName:String,
    role: String,
    task: [{type: Schema.Types.ObjectId, ref: 'todo'}],
})
module.exports = mongoose.model('user', userSchema)