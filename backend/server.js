const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
// const analyzeRoutes = require("./analyze");
const improveResume = require("./routes/improveResume");
const path = require('path');
const app = express();
dotenv.config();


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
  origin: "https://resume-analyzer-6lys.onrender.com", 
  credentials: true
}));
app.use(express.json());


// Routes define karu ga idher
app.use("/api/users", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/upload", uploadRoutes)
app.use("/api/improve-resume", improveResume);


app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get(/^(?!\/?api).*/, (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("MongoDB connection error:", err));
