const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const workoutRouter = require('./routes/workoutRoutes')
const UserRoutes = require('./routes/UserRoutes');
const jwt = require('jsonwebtoken');
const protectedRouter = require('./routes/protectedRouter');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost/bodyboostdb");

const db = mongoose.connection;

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
  
    if(typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
  
      jwt.verify(token, 'secretKey', (err, decoded) => {
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

app.get('/', (req, res) =>{
    res.send('Hello, World')
})

app.use('/api/workouts', workoutRouter);
app.use('/api/users', UserRoutes);
app.use('/api/protected', checkToken, protectedRouter);

const port = 4000;
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
});