const router = require("express").Router();
const { isAdmin } = require("../middleware/is-signed-in");
const User = require("../models/User");
const Location = require("../models/Locations");
const Sighting = require("../models/Sightings");

router.get("/", (req, res) => {
  res.render("homepage.ejs");
});

router.get("/admin", isAdmin, async (req, res) => {

    const user = req.session.user;

    const users = await User.find();
    const zones = await Location.find();
    const sightings = await Sighting.find();
    const zoneSightings = zones.map(zone => ({
    zone: zone.zone,
    count: sightings.filter(
        sighting => sighting.location && sighting.location.equals(zone._id)
    ).length
}));

    res.render("admin", {
        user,
        users,
        zones,
        sightings,
        zoneSightings
    });

});

module.exports = router;