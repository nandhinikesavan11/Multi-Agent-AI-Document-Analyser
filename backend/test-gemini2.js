require('dotenv').config({ path: 'c:\\Users\\RISHIKESH\\Desktop\\multi agent\\backend\\.env' });
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  const modelsToTest = ["gemini-pro", "gemini-1.5-flash-latest", "gemini-2.5-flash"];
  
  for (const m of modelsToTest) {
    try {
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Hello?");
      console.log(`Success with ${m}:`, result.response.text());
      return; // break on success
    } catch (e) {
      console.error(`Error with ${m}:`, e.message);
    }
  }
}
test();
