const mongoose = require('mongoose')

const sightingSchema = new mongoose.Schema({
    location: {
        type: String,
        enum: ['Manama', 'Muharraq', 'Riffa', "Hamad Town"]
    },
    status: {
        type: String,
        enum: ['Cleared/Safe', 'Overrun', 'Under Evaluation', 'Combat Ongoing', 'unknown']
    },
    dangerLevel: {
        type: String,
        enum: ['1', '2', '3', '4', '5', '6', 'unknown']
    },
    reportOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    zombieTypes: [{
        type: String,
        enum: ['Runner', 'Stalker', 'Clicker', 'Shambler', 'Bloater', 'Rat King', 'Unknown']
    }],
    description: {
        type: String
    }
}, { timestamps: true })

const Sighting = mongoose.model('Sighting', sightingSchema)

module.exports = Sighting