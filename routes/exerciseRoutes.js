const express = require('express');
const router = express.Router();
const Exercise = require('../models/exerciseModel');

router.get('/', async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/muscle/:muscleGroup', async (req, res) => {
    try {
        const exercises = await Exercise.find({ primaryMuscles: req.params.muscleGroup });
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/level/:difficulty', async (req, res) => {
    try {
        const exercises = await Exercise.find({ level: req.params.difficulty });
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;