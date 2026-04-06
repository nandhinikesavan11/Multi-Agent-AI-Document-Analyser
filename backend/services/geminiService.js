const { GoogleGenerativeAI } = require("@google/generative-ai");

const summarize = async (text) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use gemini-2.5-flash (faster and more reliable for summaries)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `Summarize the following document in one clear, professional paragraph. Focus on the core purpose and key conclusion. Text: ${text.substring(0, 15000)}`;
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Service Error:", error.message);
    throw error;
  }
};

module.exports = { summarize };