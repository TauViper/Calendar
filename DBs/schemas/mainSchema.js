const mongoose = require('mongoose')
const Schema = mongoose.Schema


const mainSchema = new Schema({
    time: {type: Schema.Types.ObjectId, ref: 'Calendar'},
    task: {type: Schema.Types.ObjectId, ref: 'Todos'},
})

module.exports = mongoose.model('Todos', mainSchema)
