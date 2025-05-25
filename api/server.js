const express = require('express');
const Groq = require('groq-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const groq = new Groq({ apiKey: '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' });

app.use(bodyParser.json());
app.use(cors());

// Tambahkan endpoint POST
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Anda adalah asisten virtual yang hanya menjawab dalam bahasa Indonesia tentang topik tembakau secara jelas, rapi, dan profesional seperti customer service yang sopan'
        },
        {
          role: 'user',
          content: message
        }
      ],
      model: 'llama3-70b-8192', // Pastikan ini adalah nama model yang valid
    });

    const responseMessage = completion.choices[0]?.message?.content || 'Maaf, saya tidak bisa memberikan balasan.';
    res.json({ reply: responseMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.' });
  }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;
