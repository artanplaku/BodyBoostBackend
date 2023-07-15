const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const workoutRouter = require('./routes/workoutRoutes')
const UserRoutes = require('./routes/UserRoutes');
const jwt = require('jsonwebtoken');
const protectedRouter = require('./routes/protectedRouter');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
  
    if(typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
  
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
          return res.sendStatus(403);
        }
  
        req.userId = decoded.id;
        next();
      });
    } else {
      return res.sendStatus(401);
    }
  }

db.on("connected", () => {
    console.log("Mongoose default connection is open")
})

db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.get('/', (req, res) =>{
    res.send('Hello, World')
})

app.use('/api/workouts', workoutRouter);
app.use('/api/users', UserRoutes);
app.use('/api/protected', checkToken, protectedRouter);

const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
});