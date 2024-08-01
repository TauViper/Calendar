const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
   date: String,
    value: String,
    completed: {
        type: Boolean,
        default: false,
    },
    user: {type: Schema.Types.ObjectId, ref: 'user'},
})

module.exports = mongoose.model('todo', todoSchema)
