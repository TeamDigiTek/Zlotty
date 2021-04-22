const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    temp: {
        type: Number,
        required: true
    },
    humid: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('data', dataSchema)