const router = require("express").Router()
const isSignedIn = require("../../../lectures/unit-two/open-house/middleware/is-signed-in")
const Location = require('../models/Locations')
const Sighting = require('../models/Sightings')




router.get('/', async (req, res) => {
    const locations = await Location.find()

    for (let location of locations) {
        const sightings = await Sighting.find({ location: location._id })

        if (sightings.length === 0) {
            location.status = 'Safe'
        } else {
            const highThreatZombies = ['Shambler', 'Bloater', 'Rat King']

            const hasHighThreat = sightings.some(sighting =>
                sighting.zombieTypes.some(type =>
                    highThreatZombies.includes(type)
                )
            )

            if (hasHighThreat) {
                location.status = 'High Threat'
            } else {
                location.status = 'Minimal Threat'
            }
        }
    }

    res.render('locations.ejs', { locations: locations })
})

router.get('/seed', async (req, res) => {
    await Location.create([
        { zone: 'Manama' },
        { zone: 'Muharraq' },
        { zone: 'Northern' },
        { zone: 'Southern' }
    ])

    res.send('Locations created')
})

router.get('/:zone', async (req, res) => {

    const foundLocation = await Location.findOne({ zone: req.params.zone })

    const sightings = await Sighting.find({ location: foundLocation._id })

    let status = ''

    if (sightings.length === 0) {
        status = 'Safe'
    } else {
        const highThreatZombies = ['Shambler', 'Bloater', 'Rat King']

        const hasHighThreat = sightings.some(sighting =>
            sighting.zombieTypes.some(type =>
                highThreatZombies.includes(type)
            )
        )

        if (hasHighThreat) {
            status = 'High Threat'
        } else {
            status = 'Minimal Threat'
        }
    }

    res.render('location-details.ejs', {
        location: foundLocation,
        sightings: sightings,
        status: status
    })
})




module.exports = router