const mongoose = require('mongoose');
const weightEntrySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    weightStart: {
        type: Number,
        required: true
    },
    currentWeight: {
        type: Number,
        default: null
    },
    weightGoal: {
        type: Number,
        default: null
    },
    timestamps: true
});

const WeightEntry = mongoose.model('WeightEntry', weightEntrySchema);
module.exports = WeightEntry;
