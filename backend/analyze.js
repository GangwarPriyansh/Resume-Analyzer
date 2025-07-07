const express = require("express");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();
const router = express.Router();


const ai = new GoogleGenAI(
  { apiKey: process.env.GEMINI_API_KEY }
);

router.post("/:filename", async (req, res) => {
  const { filename } = req.params;
  const filePath = `uploads/${filename}`;

  try {
    // Read and parse the pdf
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    const resumeText = data.text;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        role: "user",
        parts: [{
          text: `Analyze this resume and provide short means not so big suggestions:
                1. Missing important skills
                2. Sections that need improvement
                3. Project recommendations
                4. Overall improvements
                5. Formate of Resume
                6. Grammatical errors if any
                7. Formal Language is used in the resume or not 
                if you have provided any other document then just say that the provided document is not resume please upload the resume for analysis
                and if it is a resume then do not write The provided document is indeed a resume and will be analyzed just provide suggestions.
                ${resumeText}`
        }]
      }
    });

    // send it to frontend analysis 
    res.status(200).json({
      analysis: response.text
    });

  } catch (error) {
    console.error("GenAI Error:", error);
    res.status(500).json({
      message: "Failed to analyze resume",
      error: error.message
    });
  }
});

module.exports = router;