// server.js
require('dotenv').config();
const express = require('express');
const Groq = require('groq-sdk');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: userMessage }],
            model: 'llama-3.3-70b-versatile',
        });

        const reply = completion.choices[0]?.message?.content || 'No response';
        res.json({ reply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
