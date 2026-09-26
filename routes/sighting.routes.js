const router = require("express").Router()
const { get } = require("mongoose")
const isSignedIn = require("../../../lectures/unit-two/open-house/middleware/is-signed-in")
const Sighting = require('../models/Sightings')
const Location = require('../models/Locations')


router.get('/', async (req, res) => {
    const sightings = await Sighting.find()

    res.render('sightings.ejs', { sightings })
})


router.post('/', isSignedIn, async (req, res) => {
    req.body.reportOwner = req.session.user._id

    console.log("Selected zone:", req.body.location)

    const location = await Location.findOne({ zone: req.body.location })

    console.log("Found location:", location)

    req.body.location = location._id

    const newSighting = await Sighting.create(req.body)

    res.redirect('/reports')
})

router.get('/new', (req, res) => {
    res.render('new-sightings.ejs')
})


router.get('/my-reports', isSignedIn, async (req, res) => {
    const ownerSighting = await Sighting.find({ reportOwner: req.session.user._id })

    res.render('my-sightings.ejs', { sightings: ownerSighting })
})


router.get('/:id', async (req, res) => {
    const foundSighting = await Sighting.findById(req.params.id)
    res.render('sighting-details.ejs', { sighting: foundSighting })
})

router.get('/:id/edit', isSignedIn, async (req, res) => {
    const editedSighting = await Sighting.findById(req.params.id)
    if (editedSighting.reportOwner.equals(req.session.user._id)) {
        res.render('edit-sighting.ejs', { sighting: editedSighting })

    } else { res.send('You are not authorized to edit') }
})


router.put('/:id', isSignedIn, async (req, res) => {

    const sightingToUpdate = await Sighting.findById(req.params.id)
    if (sightingToUpdate.reportOwner.equals(req.session.user._id)) {
        const updatedSighting = await Sighting.findByIdAndUpdate(req.params.id, req.body)

        res.render('sighting-details.ejs', { sighting: updatedSighting })
    } else { res.send('You are not authorized to update') }

})


router.delete('/:id', isSignedIn, async (req, res) => {
    const sightingToDelete = await Sighting.findById(req.params.id)

    if (sightingToDelete.reportOwner.equals(req.session.user._id)) {
        await Sighting.findByIdAndDelete(req.params.id)
        res.redirect('/reports')
    } else { res.send('You are not authorized to delete') }
})


module.exports = router;


