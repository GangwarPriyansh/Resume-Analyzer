import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ResumeForm from "./components/ResumeForm";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ResumePreview from "./components/ResumePreview";

function App() {
  return (
    <Router>
      <div className="font-sans">
        <ToastContainer
          position="top-right"
          className="toast-top-right-custom"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="print:hidden sticky top-0 z-50">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/resume-builder" element={<ResumeForm />} />
            <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/resume-preview" element={<ResumePreview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
