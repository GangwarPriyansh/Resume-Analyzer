// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const pdfParse = require("pdf-parse");
// const { GoogleGenAI } = require("@google/genai");
// require("dotenv").config();

// const router = express.Router();

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "backend/uploads/");
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadPath = path.join(__dirname, "../uploads");
//     // Ensure the uploads directory exists
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "application/pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF files are allowed"), false);
//   }
// };
// const upload = multer({ storage, fileFilter });

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// router.post("/resume", upload.single("resume"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   const filePath = req.file.path;

//   try {
//     const buffer = fs.readFileSync(filePath);
//     const data = await pdfParse(buffer);
//     const resumeText = data.text;

//     const prompt = `Analyze this resume and provide short means not so big suggestions:
//                 1. Missing important skills
//                 2. Sections that need improvement
//                 3. Project recommendations
//                 4. Overall improvements
//                 5. Formate of Resume
//                 6. Grammatical errors if any
//                 7. Formal Language is used in the resume or not 
//                 if you have provided any other document then just say that the provided document is not resume please upload the resume for analysis
//                 and if it is a resume then do not write The provided document is indeed a resume and will be analyzed just provide suggestions.
//                 ${resumeText}`;

//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: {
//         role: "user",
//         parts: [{ text: prompt }],
//       },
//     });

//     res.status(200).json({
//       filename: req.file.filename,
//       analysis: response.text,
//     });

//   } catch (err) {
//     console.error("Upload & AI Error:", err);
//     res.status(500).json({
//       message: "Failed to process resume",
//       error: err.message,
//     });
//   }
// });

// module.exports = router;



const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {

    const cleanName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, Date.now() + "_" + cleanName);
  },
});

const fileFilter = (req, file, cb) => {
  const validMimeTypes = [
    "application/pdf",
    "application/octet-stream",
    "application/x-pdf"
  ];

  if (validMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};


const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/resume", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded or file type not supported",
      details: "Please upload a PDF file"
    });
  }

  const filePath = req.file.path;

  try {
    // Check if file exists and is readable
    if (!fs.existsSync(filePath)) {
      throw new Error("File upload failed - file not saved properly");
    }

    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);

    if (!data.text || data.text.length < 10) {
      throw new Error("The uploaded PDF doesn't contain readable text");
    }

    const prompt = `Analyze this resume and provide short means not so big suggestions:
                1. Missing important skills
                2. Sections that need improvement
                3. Project recommendations
                4. Overall improvements
                5. Formate of Resume
                6. Grammatical errors if any
                7. Formal Language is used in the resume or not 
                if you have provided any other document then just say that the provided document is not resume please upload the resume for analysis
                and if it is a resume then do not write The provided document is indeed a resume and will be analyzed just provide suggestions.
                ${data.text}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        role: "user",
        parts: [{ text: prompt }],
      },
    });

    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    res.status(200).json({
      filename: req.file.filename,
      analysis: response.text,
    });

  } catch (err) {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error("Error deleting file:", unlinkErr);
      });
    }

    console.error("Upload & AI Error:", err);
    res.status(500).json({
      message: "Failed to process resume",
      error: err.message,
      details: "Please try again with a different PDF file"
    });
  }
});

module.exports = router;