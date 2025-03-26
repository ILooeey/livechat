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
  const keywords = ['tembakau', 'rokok', 'nikotin', 'tembakau kering', 'cerutu', 'solusi', 'tanaman', 'tumbuhan', 'sehat', 'subur', 'hama'];
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
      messages: [{ role: 'user', content: message },
                { role: 'system', content: 'Jawaban Anda harus tertata rapi, menggunakan paragraf, dan Anda dapat menggunakan <strong>bold</strong> untuk menekankan bagian penting. 
                  Anda hanya menjawab dalam bahasa Indonesia dan topik harus seputar tembakau. Anda dapat memberikan informasi dengan jelas dan profesional' }
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
