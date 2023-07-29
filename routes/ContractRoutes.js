const express = require('express');
const ContractModel = require('../models/contractModel');
const checkToken = require('../checkToken');
const router = express.Router();

router.post('/create', checkToken, async (req, res) => {
    const userId = req.userId; 
    const { content, signature } = req.body;
  
    const contract = new ContractModel({
      content: content,
      signature: signature,
      user: userId
    });
  
    try {
      await contract.save();
      res.status(201).json(contract);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  

router.get('/', checkToken, async (req, res) => {
    const userId = req.userId;
  
    try {
      const contracts = await ContractModel.find({ user: userId });
      res.json(contracts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.get('/:id', checkToken, async (req, res) => {
    const contract = await ContractModel.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.json(contract);
});

router.put('/:id', checkToken, async (req, res) => {
    const { content, signature } = req.body;
    const contract = await ContractModel.findByIdAndUpdate(req.params.id, { content, signature }, { new: true });
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.json(contract);
});

router.delete('/:id', checkToken, async (req, res) => {
    const contract = await ContractModel.findByIdAndDelete(req.params.id);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.json({ message: 'Contract deleted' });
  });
  
module.exports = router;