const express = require('express');
const axios = require('axios'); 
const router = express.Router();
const checkToken = require('../checkToken');

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.OPENAI_API_KEY;

router.post('/', checkToken, async (req, res) => {
    const requestBody = req.body;

    try {
        const response = await axios.post(OPENAI_API_URL, requestBody, {
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            }
        });
        console.log("OpenAI API Response:", response.data);
        res.json(response.data);
        console.log(response.data)
    } catch (error) {
        console.error("Error while processing the request:", error);
        res.status(500).json({ error: "Failed to process the request." });
    }
});

module.exports = router;
