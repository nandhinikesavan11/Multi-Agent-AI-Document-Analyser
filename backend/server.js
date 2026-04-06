require('dotenv').config();
const express = require('express');
const multer = require('multer');
const PDFParser = require("pdf2json"); // New Library
const cors = require('cors');

const { getInsights } = require('./services/groqInsightsService');
const { factCheck } = require('./services/groqFactCheckService');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.post('/analyze', upload.single('pdf'), async (req, res) => {
  console.log("\n--- 📥 New Request Received ---");

  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

    // --- NEW PDF PARSING LOGIC ---
    const pdfParser = new PDFParser(null, 1); // '1' flag extracts raw text

    const text = await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
      pdfParser.on("pdfParser_dataReady", pdfData => {
        // pdf2json returns encoded text, we decode it here
        const rawText = pdfParser.getRawTextContent();
        resolve(rawText);
      });
      pdfParser.parseBuffer(req.file.buffer);
    });

    console.log(`✅ Text Extracted (Length: ${text.length} chars)`);

    if (text.length < 20) {
      return res.status(400).json({ error: 'PDF text is too short or empty.' });
    }
    // --- END OF NEW LOGIC ---

    // Dispatch AI Agents
    console.log("🤖 Dispatching AI Agents...");
    const [insights, facts] = await Promise.all([
      getInsights(text).catch(err => ["Insights failed."]),
      factCheck(text).catch(err => [{ claim: "Error", status: "N/A", reasoning: "Failed" }])
    ]);

    res.json({ insights, factCheck: facts });

  } catch (error) {
    console.error("🚨 Server Error:", error);
    res.status(500).json({ error: "Failed to parse PDF or analyze content." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));