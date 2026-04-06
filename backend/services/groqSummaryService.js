const axios = require('axios');

const summarize = async (text) => {
  try {
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "llama-3.1-8b-instant",
      messages: [{ 
        role: "user", 
        content: `Summarize the following document in one clear, professional paragraph. Focus on the core purpose and key conclusion. Text: ${text.substring(0, 8000)}` 
      }]
    }, {
      headers: { 
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Groq Summary Service Error:", error.message);
    throw error;
  }
};

module.exports = { summarize };
