const express = require("express");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/", async (req, res) => {
  const resumeData = req.body;

  try {
    const prompt = `
You are an AI resume assistant. Improve the resume content provided below (in JSON format) following these rules:

1. Return ONLY the improved resume as plain text — no extra comments or explanations.
2. Use clear section headings in ALL CAPS (e.g., SUMMARY, SKILLS, EXPERIENCE).
3. Apply these enhancements:
   - Fix grammar and punctuation.
   - Use professional and concise language.
   - Use bullet points where applicable.
   - Quantify achievements where possible.

4. Maintain this strict structure and order:
   SUMMARY
   [Improved professional summary]

   SKILLS
   - Frontend: [Skills]
   - Backend: [Skills]
   - Tools: [Skills]

   EXPERIENCE
   [Company]  [Position] ([Years])
   - [Achievement]
   - [Achievement]

   PROJECTS
   [Project Title]
   - [Brief Description]
   - [Technologies Used]

   ACHIEVEMENTS
   - [Achievement 1]
   - [Achievement 2]

   EDUCATION
   [Institution] [Degree] ([Years])
   - [Details]

5. After these sections, include any additional fields **not named**: name, contact, email, linkedin, github, summary, education, skills, projects, experience, or achievements.
   - Treat them as custom sections.
   - Use the field name (in ALL CAPS) as the section heading.
   - Format the content clearly underneath.
   - Do NOT prefix with “THIS_IS_A_CUSTOM_SECTION” or similar.
   - Do NOT repeat name, contact, email, linkedin, or github.
   - Also check if there is any spelling mistake and also make the text formal of custom fields also.

6. Limit total content to a **maximum of 280 words** to fit a single A4 page. the resume must be of one page

Here is the original resume content in JSON:

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