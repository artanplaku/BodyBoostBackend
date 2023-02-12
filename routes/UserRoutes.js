const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');

router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username, email: req.body.email, password: req.body.password }), req.body.password, (err, user) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        passport.authenticate('local')(req, res, () => {
            res.send('Registration successful');
        });
    });
});


router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send('Login successful');
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


module.exports = router;