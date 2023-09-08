const express = require('express');
const Workout = require('../models/workoutModel');
const jwt = require('jsonwebtoken')
const router = express.Router();
const checkToken = require('../checkToken')



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
    day: req.body.day,
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

  // Define the endpoint to update the clicked status of a specific exercise
router.put('/:workoutId/exercises/:exerciseId/click', checkToken, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    const exercise = workout.exercises.id(req.params.exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    exercise.clicked = !exercise.clicked; // Toggle clicked status

    if(exercise.clicked) {
      exercise.completedDate = new Date();
    } else {
      exercise.completedDate = null;
    }

    await workout.save();
    res.json(exercise);
  } catch (err) {
    res.status(500).json({ message: err.message });
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