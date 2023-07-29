const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    signature: {
      type: String,
      required: false
    }
  }, {
    timestamps: true
  });

  const ContractModel = mongoose.model('Contract', ContractSchema)
  module.exports = ContractModel;