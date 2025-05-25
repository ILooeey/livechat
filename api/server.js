const express = require('express');
const Groq = require('groq-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const groq = new Groq({ apiKey: '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' });

app.use(bodyParser.json());
app.use(cors());

  try {
    const completion = await groq.chat.completions.create({
  messages: [
    { role: 'system', content: 'Anda adalah asisten virtual yang hanya menjawab dalam bahasa Indonesia tentang topik tembakau secara jelas, rapi, dan profesional seperti customer service yang sopan' },
    { role: 'user', content: message }
  ],
  model: 'llama-3.3-70b-versatile',
});


    const responseMessage = completion.choices[0]?.message?.content || 'Maaf, saya tidak bisa memberikan balasan.';
    res.json({ reply: responseMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.' });
  }
});

module.exports = app;
