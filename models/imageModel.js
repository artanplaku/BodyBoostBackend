const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ImageModel = mongoose.model('Image', imageSchema);

module.exports = ImageModel;
