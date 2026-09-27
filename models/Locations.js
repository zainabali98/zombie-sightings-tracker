const mongoose = require('mongoose')


const locationSchema = new mongoose.Schema({
    zone: {
        type: String,
        enum: ['Muharraq', 'Manama', 'Northern', 'Southern']
    },
    
}, { timestamps: true })


const Location = mongoose.model('Location', locationSchema)

module.exports = Location