const express = require('express');
const WeightEntry = require('../models/weightEntryModel');
const jwt = require('jsonwebtoken')
const router = express.Router();
const checkToken = require('../checkToken')

// 1. POST route to add a new weight entry
router.post('/',checkToken, (req, res) => {
    const userId = req.userId; 
    const { weight } = req.body;
    const newEntry = new WeightEntry({ userId, weight });
    newEntry.save((err, entry) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).send(entry);
    });
});

// 2. GET route to fetch weight entries
router.get('/',checkToken, (req, res) => {
    const userId = req.userId;
    WeightEntry.find({ userId }, (err, entries) => {
        if (err) return res.status(500).send(err.message);
        res.send(entries);
    });
});

// 3. PUT route to update a weight entry
router.put('/:entryId',checkToken, (req, res) => {
   
    WeightEntry.findById(req.params.entryId, (err, entry) => {
        if (err) return res.status(500).send(err.message);
        if (entry.userId.toString() !== req.userId) {
            return res.status(403).send('Permission denied');
        }
        const { weight } = req.body;
        WeightEntry.findByIdAndUpdate(req.params.entryId, { weight }, { new: true }, (err, entry) => {
            if (err) return res.status(500).send(err.message);
            res.send(entry);
        });
    });
});

// 4. DELETE route to remove a weight entry
router.delete('/:entryId',checkToken, (req, res) => {
    WeightEntry.findById(req.params.entryId, (err, entry) => {
        if (err) return res.status(500).send(err.message);
        if (entry.userId.toString() !== req.userId) {
            return res.status(403).send('Permission denied');
        }
        WeightEntry.findByIdAndDelete(req.params.entryId, (err) => {
            if (err) return res.status(500).send(err.message);
            res.send({ message: 'Entry deleted successfully' });
        });
    });
});

module.exports = router;

