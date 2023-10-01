const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        User.create({ username: req.body.username, email: req.body.email, password: hash }, (err, user) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            const token = jwt.sign({ id: user._id }, 'secretKey');
            res.send({ token });
        });
    });
});


router.post('/login', (req, res) => {
    console.log("Received login request: ", req.body);
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        if (!user) {
            console.log("User not found");
            return res.status(404).send('User not found');
        }
        console.log("User found:", user);
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) {
                console.log("Error in bcrypt.compare:", err);
                console.error(err.message);
                return res.status(500).send(err.message);
            }
            console.log("isMatch:", isMatch);
            if (!isMatch) {
               
                return res.status(401).send('Incorrect password');
            }
            const token = jwt.sign({ id: user._id}, 'secretKey');
            console.log("Login successful. Token: ", token);
            res.send({ token });
        });
    });
});

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send('Logged out');
        }
    });
});

router.delete('/:username', (req, res) => {
    User.deleteOne({ username: req.params.username }, (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send('User deleted');
    });
});


module.exports = router;