const express = require('express');
const Groq = require('groq-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const groq = new Groq({ apiKey: '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' }); // Ganti dengan API Key Anda

app.use(bodyParser.json());
app.use(cors());

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'llama-3.3-70b-versatile',
    });

    const responseMessage = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    res.json({ reply: responseMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing the request' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
