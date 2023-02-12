const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
// const session = require("express-session");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
// const User = require("./models/userModel");
// const routes = require('./routes/routes')
// const Workout = require('./models/workoutModel')
const workoutRouter = require('./routes/workoutRoutes')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// app.use(
//     session({ 
//         secret: "secret-key", 
//         resave: false, 
//         saveUninitialized: false 
//     })
//     );

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(routes)

mongoose.connect("mongodb://localhost/bodyboostdb");

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Mongoose default connection is open")
})

app.get('/', (req, res) =>{
    res.send('Hello, World')
})

app.use('/api/workouts', workoutRouter);

const port = 4000;
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
});