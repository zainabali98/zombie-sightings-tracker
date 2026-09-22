const mongoose = require('mongoose')


const locationSchema = new mongoose.Schema({
    name: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    infectionLevel: {
        type: Number
    },
    status: {
        type: String
    }
}, { timestamps: true })


const Location = mongoose.model('Location', locationSchema)

module.exports = Location