const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const workoutRouter = require('./routes/workoutRoutes')
const UserRoutes = require('./routes/UserRoutes');
const protectedRouter = require('./routes/protectedRouter');
const imageRoutes = require('./routes/ImageRoutes');
const contractRoutes = require('./routes/ContractRoutes') 
const checkToken = require('./checkToken')
const chatRoute =  require('./routes/chatRoute')
const exerciseRoutes = require('./routes/exerciseRoutes');
const UserProfileRoutes = require('./routes/UserProfileRoutes')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

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
app.use('/api/images', imageRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/contracts', contractRoutes);
app.use('/api/chat', chatRoute)
app.use('/api/exercises', exerciseRoutes);
app.use('/api/userprofile', UserProfileRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
});