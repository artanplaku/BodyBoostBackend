const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: String,
    gender: String,
    height: { feet: Number, inches: Number },
    age: Number,
    startingWeight: Number,
    currentWeight: Number,
    goalWeight: Number,
    lastUpdated: Date
}, {
    timestamps: true
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;

