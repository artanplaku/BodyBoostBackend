const express = require('express');
const UserProfile = require('../models/userProfileModel');
const checkToken = require('../checkToken')
const router = express.Router();

router.post('/', checkToken, (req, res) => {
    const userId = req.userId;
    UserProfile.findOneAndUpdate(
        { userId }, 
        { ...req.body, userId }, 
        //upsert is a combination of update and insert
        { upsert: true, new: true }, 
        (err, profile) => {
            if (err) return res.status(500).send(err.message);
            res.status(201).send(profile);
        }
    );
});

// 2. GET route to fetch user profile
router.get('/', checkToken, (req, res) => {
    const userId = req.userId;
    UserProfile.findOne({ userId }, (err, profile) => {
        if (err) return res.status(500).send(err.message);
        res.send(profile);
    });
});

// 3. PUT route to update specific fields in user profile
router.put('/', checkToken, (req, res) => {
    const userId = req.userId;
    UserProfile.findOneAndUpdate(
        { userId }, 
        { ...req.body }, 
        { new: true }, 
        (err, profile) => {
            if (err) return res.status(500).send(err.message);
            res.send(profile);
        }
    );
});

// 4. DELETE route to remove user profile
router.delete('/', checkToken, (req, res) => {
    const userId = req.userId;
    UserProfile.findOneAndDelete({ userId }, (err) => {
        if (err) return res.status(500).send(err.message);
        res.send({ message: 'Profile deleted successfully' });
    });
});

module.exports = router;

