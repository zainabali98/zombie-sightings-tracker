const router = require("express").Router()

router.get('/', async (req, res)=>{

res.render('zombies.ejs')
})

module.exports = router