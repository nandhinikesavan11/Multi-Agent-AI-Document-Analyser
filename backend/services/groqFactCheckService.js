const axios = require('axios');

const factCheck = async (text) => {
  try {
    const prompt = `From the following text, extract 3 major factual claims. 
    Return ONLY a valid JSON object with a key called "claims" containing an array of objects.
    Each object must have: "claim", "status", and "reasoning".
    Text: ${text.substring(0, 8000)}`;

    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    }, {
      headers: { 
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const rawData = JSON.parse(response.data.choices[0].message.content);
    return rawData.claims || [];
  } catch (error) {
    console.error("Groq Fact Check Service Error:", error.message);
    throw error;
  }
};

module.exports = { factCheck };