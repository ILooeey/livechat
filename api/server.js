const express = require('express');
const Groq = require('groq-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const groq = new Groq({ apiKey: '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' });

app.use(bodyParser.json());
app.use(cors());

// Fungsi sederhana untuk mengecek apakah pesan terkait dengan tembakau
function isTobaccoRelated(message) {
  const keywords = ['tembakau', 'rokok', 'nikotin', 'tembakau kering', 'cerutu', 'solusi', 'tanaman', 'tumbuhan', 'sehat', 'subur', 'hama', 'ada', 'masalah', 'terimakasih', 'terima kasih', 'hai'];
  return keywords.some(keyword => message.toLowerCase().includes(keyword));
}

app.post('/api/server', async (req, res) => {
  const { message } = req.body;

  // Cek apakah pesan berbahasa Indonesia dan terkait tembakau
  if (!isTobaccoRelated(message)) {
    return res.json({ reply: 'Maaf, saya hanya bisa mendiskusikan topik seputar tembakau.' });
  }

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
