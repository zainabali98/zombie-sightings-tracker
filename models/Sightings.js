const mongoose = require('mongoose')

const sightingSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    status: {
        type: String
    },
    dangerLevel: {
        type: Number
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