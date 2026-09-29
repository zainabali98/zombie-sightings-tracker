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

    
   const zoneSightings = zones.map(zone => {

    const zoneSightings = sightings.filter(
        sighting => sighting.location && sighting.location.equals(zone._id)
    );

    let status = '';

    if (zoneSightings.length === 0) {
        status = 'Safe';
    } else {
        const highThreatZombies = ['Shambler', 'Bloater', 'Rat King'];

        const hasHighThreat = zoneSightings.some(sighting =>
            sighting.zombieTypes.some(type =>
                highThreatZombies.includes(type)
            )
        );

        if (hasHighThreat) {
            status = 'High Threat';
        } else {
            status = 'Minimal Threat';
        }
    }

    return {
        zone: zone.zone,
        count: zoneSightings.length,
        status: status
    };
});

    res.render("admin", {
        user,
        users,
        zones,
        sightings,
        zoneSightings
    });

});

module.exports = router;