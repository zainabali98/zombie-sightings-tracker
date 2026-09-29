const router = require("express").Router()
const Sighting = require('../models/Sightings')
const Location = require('../models/Locations')
const PDFDocument = require('pdfkit')
const { isSignedIn, isAdmin } = require("../middleware/is-signed-in")



router.get('/', async (req, res) => {
    const sightings = await Sighting.find().populate('location')

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

router.get('/new', isSignedIn, (req, res) => {
    res.render('new-sightings.ejs', {
        user: req.session.user
    })
})


router.get('/my-reports', isSignedIn, async (req, res) => {
    const ownerSighting = await Sighting.find({ reportOwner: req.session.user._id })

    res.render('my-sightings.ejs', { sightings: ownerSighting })
})


router.get('/pdf', isAdmin, async (req, res)=> {
    const sightings = await Sighting.find().populate('location')
    const doc = new PDFDocument()
    res.setHeader('Content-Type', 'application/pdf')
res.setHeader('Content-Disposition', 'attachment; filename="zombie-reports.pdf"')
doc.pipe(res)


doc.fontSize(24).text('Zombie Sightings Report')
doc.moveDown()

sightings.forEach((sighting) => {
    doc.fontSize(14).text(`Zombie Type: ${sighting.zombieTypes.join(', ')}`)
    doc.text(`Zone: ${sighting.location.zone}`)
    doc.text(`Specific Location: ${sighting.specificLocation}`)
    doc.text(`Danger Level: ${sighting.dangerLevel}`)
    doc.text(`Description: ${sighting.description}`)
    doc.moveDown()
})


doc.end()

})

router.get('/:id', async (req, res) => {
    const foundSighting = await Sighting.findById(req.params.id).populate('location')
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

        const location = await Location.findOne({ zone: req.body.location })
        req.body.location = location._id

        const updatedSighting = await Sighting.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.render('sighting-details.ejs', {
            sighting: updatedSighting
        })

    } else {
        res.send('You are not authorized to update')
    }
})


router.delete('/:id', isSignedIn, async (req, res) => {
    const sightingToDelete = await Sighting.findById(req.params.id)

    if (sightingToDelete.reportOwner.equals(req.session.user._id) || req.session.user.isAdmin) {
        await Sighting.findByIdAndDelete(req.params.id)
        res.redirect('/reports')
    } else { res.send('You are not authorized to delete') }
})



module.exports = router;


