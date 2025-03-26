module.exports = (req, res) => {
  const Groq = require('groq-sdk');
  const bodyParser = require('body-parser');

  const groq = new Groq({ apiKey: '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' }); // Ganti dengan API Key Anda

  bodyParser.json()(req, res, async () => {
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
        res.json({ reply: 'Maaf, saya hanya bisa membantu seputar tembakau.' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.' });
    }
  });
};
