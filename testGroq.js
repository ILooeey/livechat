const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: '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' });

async function testGroq() {
    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: "Hello, what is AI?" }],
            model: "llama-3.3-70b-versatile"
        });
        console.log("Response from GROQ:", completion.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error);
    }
}

testGroq();
