const router = require("express").Router()
const isSignedIn = require("../../../lectures/unit-two/open-house/middleware/is-signed-in")
const Sighting = require('../models/Sightings')


router.get('/', async (req, res) => {
    const sightings = await Sighting.find()

    res.render('sightings.ejs', { sightings })
})


router.post('/', isSignedIn, async (req, res) => {
    const newSighting = await Sighting.create(req.body)

    res.redirect('/reports')
})

router.get('/new', (req, res) => {
    res.render('new-sightings.ejs')
})

router.get('/:id', async (req, res)=>{
    const foundSighting = await Sighting.findById(req.params.id)
    res.render('sighting-details.ejs', {sighting: foundSighting})
})




module.exports = router;


