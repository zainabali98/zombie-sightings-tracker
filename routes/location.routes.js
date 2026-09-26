const router = require("express").Router()
const isSignedIn = require("../../../lectures/unit-two/open-house/middleware/is-signed-in")
const Location = require('../models/Locations')
const Sighting = require('../models/Sightings')




router.get('/', async (req, res)=>{
 const locations = await Location.find()
 res.render('locations.ejs', {locations: locations})
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
  console.log(foundLocation)

  const sightings = await Sighting.find({ location: foundLocation._id })

  res.render('location-details.ejs', {
location: foundLocation,
    sightings: sightings
  })

})




module.exports = router