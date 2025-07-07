const express = require("express");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/", async (req, res) => {
  const resumeData = req.body;

  try {
    const prompt = `
You are an AI resume assistant. Improve this resume content following these rules:

1. Return the enhanced resume in plain text format 
2. Format it with clear section headings in ALL CAPS
3. Make these improvements:
   - Fix grammar and punctuation
   - Use professional language
   - Keep bullet points concise
   - Quantify achievements where possible
4. Maintain this exact structure:
   
SUMMARY
[Improved professional summary]

SKILLS 
- Frontend: [Skill 1],[Skill 2]
- backend:[Skill 1],[skill 3] etc.

EXPERIENCE (it should not be lenghty and explain the achivement in short)
[Company] - [Position] ([Years])
- [Achievement 1]
- [Achievement 2]

PROJECTS (it should not be lengthy just explain what it does and technologies used)
[Project Name]
- [Description]
- [Technologies]

ACHIEVEMENTS
- [Achievement 1]
- [Achievement 2]

EDUCATION
[Institution] - [Degree] ([Years])
[Details]

Keep everything concise and professional. And Ensure that total words in the resume does not exceed more than 280 words as resume should be completed in 1 page the size of the page is a4. 
Here is the original content:
${JSON.stringify(resumeData, null, 2)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        role: "user",
        parts: [{ text: prompt }]
      }
    });

    const improvedResume = response.text;
    res.status(200).send(improvedResume); 
  } catch (err) {
    console.error("Resume Improvement Error:", err);
    res.status(500).send("Failed to improve resume: " + err.message);
  }
});

module.exports = router;