const express = require("express")
const app = express()
app.set("view engine", "ejs");

const dotenv = require("dotenv").config()
const morgan = require('morgan')
const session = require('express-session');
const methodOverride = require('method-override')
const {MongoStore} = require("connect-mongo");
const connectToDB = require('./db.js')



const passUserToView = require("./middleware/pass-user-to-view.js");

const authController = require("./routes/auth.routes.js");
const indexController = require("./routes/index.routes.js");
const sightingsRouter = require('./routes/sighting.routes.js');
const locationRouter = require('./routes/location.routes.js');
const zombieRouter = require('./routes/zombies.routes.js');


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

    store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: "sessions"
    }),

    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);
app.use(passUserToView)



app.use('/auth',authController)
app.use('/',indexController)
app.use('/reports', sightingsRouter )
app.use('/locations', locationRouter)
app.use('/zombies', zombieRouter)



app.use((req, res) => {
    res.status(404).render("404.ejs");
});



async function startServer() {
    const PORT = process.env.PORT || 3000;
    await connectToDB();

    app.listen(PORT, () => {
        console.log(`🧟 App is running on port ${PORT} 🧟` );
    });
}



startServer();