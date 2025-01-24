const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Endpoint for interacting with Pollinations.AI
app.get('/poli', async (req, res) => {
    const { prompt, type } = req.query;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt parameter is required.' });
    }

    try {
        let response;

        if (type === 'text') {
            // Call Pollinations Text API
            response = await axios.get(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
            res.json({ result: response.data });
        } else {
            // Call Pollinations Image API
            response = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`, {
                responseType: 'arraybuffer',
            });
            res.setHeader('Content-Type', 'image/jpeg');
            res.send(response.data);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process the request.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
