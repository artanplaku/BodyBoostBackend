const express = require('express');
const Workout = require('../models/workoutModel');
const jwt = require('jsonwebtoken')
const router = express.Router();

// Define checkToken function
function checkToken(req, res, next) {
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

// Define the endpoint to get all workouts
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    const workouts = await Workout.find({ userId: userId });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Define the endpoint to get a single workout by ID
router.get('/:id', checkToken, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Define the endpoint to create a new workout
router.post('/', checkToken, async (req, res) => {
  const workout = new Workout({
    title: req.body.title,
    exercises: req.body.exercises,
    userId: req.body.userId
  });

  try {
    const newWorkout = await workout.save();
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Define the endpoint to update a workout by ID
router.put('/:id', async (req, res) => {
    try {
      const updatedWorkout = await Workout.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedWorkout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.json(updatedWorkout);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Define the endpoint to delete a workout by ID
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndRemove(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;