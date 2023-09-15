const express = require('express');
const router = express.Router();
const Exercise = require('../models/exerciseModel');

router.get('/', async (req, res) => {
    try {
        let query = {};

        if (req.query.muscle) {
            query.primaryMuscles = req.query.muscle;
        }

        if (req.query.level) {
            query.level = req.query.level;
        }

        const exercises = await Exercise.find(query);
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;