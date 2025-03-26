const express = require('express');
const Groq = require('groq-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const groq = new Groq({ apiKey: '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' }); 

app.use(bodyParser.json());
app.use(cors());

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'llama-3.3-70b-versatile',
    });

    const responseMessage = completion.choices[0]?.message?.content || 'Maaf, saya tidak bisa menghasilkan respons.';

    // Pengecekan apakah respons mengandung kata "tembakau"
    if (responseMessage.toLowerCase().includes('tembakau')) {
      res.json({ reply: responseMessage });
    } else {
      // Respons jika topik tidak relevan dengan tembakau
      res.json({ reply: 'Maaf, saya hanya bisa membantu seputar tembakau.' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
