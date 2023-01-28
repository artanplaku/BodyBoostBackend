const express = require("express");
const app = express();
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/bodyboostdb" );

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Mongoose default connection is open")
})

app.get('/', (req, res) =>{
    res.send('Hello, World')
})

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
});