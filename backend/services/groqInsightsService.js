const axios = require('axios');

const getInsights = async (text) => {
  try {
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "llama-3.1-8b-instant",
      messages: [{ 
        role: "user", 
        content: `Analyze this content and provide exactly 5 key insights as a bulleted list. Text:\n\n${text.substring(0, 8000)}` 
      }]
    }, {
      headers: { 
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const content = response.data.choices[0].message.content;

    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('*') || line.startsWith('-') || /^\d+\./.test(line))
      .map(line => line.replace(/^[*-\d.]+\s*/, ''));
  } catch (error) {
    console.error("Groq Insights Service Error:", error.message);
    throw error;
  }
};

module.exports = { getInsights };