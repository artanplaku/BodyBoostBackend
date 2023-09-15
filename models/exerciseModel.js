const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: String,
        required: true
    },
    primaryMuscles: {
        type: [String],
        required: true
    },
    instructions: {
        type: [String],
        required: true
    },
    images: [String],
});

module.exports = mongoose.model('Exercise', exerciseSchema);
