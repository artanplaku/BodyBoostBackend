const axios = require('axios');
const Exercise = require('../models/exerciseModel');

async function fetchAndStoreExercises() {
    try {
        const response = await axios.get('https://api.github.com/repos/yuhonas/free-exercise-db/contents/exercises');
        const exercises = response.data;

        for (const exercise of exercises) {
            if (exercise.download_url) {  // Check if download_url is not null
                console.log("Fetching details from:", exercise.download_url);
                try {
                    const exerciseDetails = await axios.get(exercise.download_url);
                    const newExercise = new Exercise(exerciseDetails.data);
                    await newExercise.save();
                } catch (innerError) {
                    console.error("Error fetching details for:", exercise.download_url, innerError.message);
                }
            } else {
                console.warn("Skipped due to null download_url for:", exercise.name || "Unknown Exercise");
            }
        }

    } catch (error) {
        console.error("Error in fetchAndStoreExercises:", error);
    }
}

module.exports = fetchAndStoreExercises;

