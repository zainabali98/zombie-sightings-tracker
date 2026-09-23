const router = require("express").Router()
const isSignedIn = require("../../../lectures/unit-two/open-house/middleware/is-signed-in")
const Location = require('../models/Locations')





router.get('/', async (req, res)=>{
 const locations = await Location.find()
 res.render('locations.ejs', {locations: locations})
})

router.get('/:id', async (req, res) =>{
    const foundLocation = await Location.findById(req.params.id)
    res.render('location-details.ejs', {location: foundLocation})
})

module.exports = router