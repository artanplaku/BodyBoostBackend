const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const checkToken = require('../checkToken');


const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.OPENAI_API_KEY;

router.post('/', checkToken, async (req, res) => {
    const requestBody = req.body;

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to process the request." });
    }
});

module.exports = router;
