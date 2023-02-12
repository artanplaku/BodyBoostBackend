const mongoose = require('mongoose');
const Workout = require('./models/workoutModel');

mongoose
    .connect('mongodb://localhost/bodyboostdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        const workouts = [
          new Workout({
            title: 'Full Body Workout',
            exercises: [
              { name: 'Deadlifts', sets: 4, reps: 12, weight: 60 },
              { name: 'Squats', sets: 4, reps: 12, weight: 40 },
              { name: 'Push Ups', sets: 4, reps: 12, weight: 0 },
              { name: 'Pull Ups', sets: 4, reps: 12, weight: 0 },
            ],
          }),
          new Workout({
            title: 'Upper Body Workout',
            exercises: [
              { name: 'Bench Press', sets: 4, reps: 12, weight: 40 },
              { name: 'Bicep Curls', sets: 4, reps: 12, weight: 20 },
              { name: 'Tricep Dips', sets: 4, reps: 12, weight: 0 },
              { name: 'Shoulder Press', sets: 4, reps: 12, weight: 30 },
            ],
          }),
          new Workout({
            title: 'Lower Body Workout',
            exercises: [
              { name: 'Lunges', sets: 4, reps: 12, weight: 20 },
              { name: 'Calf Raises', sets: 4, reps: 12, weight: 30 },
              { name: 'Leg Press', sets: 4, reps: 12, weight: 50 },
              { name: 'Glute Bridges', sets: 4, reps: 12, weight: 30 },
            ],
          }),
        ];
    
        let done = 0;
    for (let i = 0; i < workouts.length; i++) {
      workouts[i].save(function (err, result) {
        done++;
        if (done === workouts.length) {
          exit();
        }
      });
    }

    function exit() {
      mongoose.disconnect();
    }
  })
  .catch((err) => console.error(err));