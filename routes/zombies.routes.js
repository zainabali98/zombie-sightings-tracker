const router = require("express").Router()

router.get('/', (req, res)=>{

res.render('zombies.ejs')
})

module.exports = router