import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="hero" className="bg-[#1c2331] text-white">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row md:flex-row items-center justify-between p-8">
        <img
          src="/images/hero_img.png"
          alt="hero image"
          className="w-full lg:w-[500px] lg:mb-0 mb-6 md:w-[400px] md:mb-0"
        />

        <div className="lg:ml-12 max-w-xl text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-blue-500">ResumeBuddy</span>
            <br />
            Your gateway to career success
          </h2>
          <p className="text-gray-400 mb-6">
            Struggling with your resume? Build it with AI, then analyze its
            strengths—before recruiters do!
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button
              onClick={() => navigate("/resume-builder")}
              className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"
            >
              Resume Builder
            </button>
            <button
              onClick={() => navigate("/resume-analyzer")}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Resume Analyzer
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 px-4 md:px-12 text-center">
        <h3 className="text-3xl font-bold mb-10">Features</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="bg-[#252c3b] p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🚀</div>
            <h4 className="text-xl font-semibold mb-2 text-blue-400">AI-Powered</h4>
            <p className="text-gray-300">
              Our AI analyzes your input and generates a tailored resume for you.
            </p>
          </div>

          <div className="bg-[#252c3b] p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">📄</div>
            <h4 className="text-xl font-semibold mb-2 text-blue-400">Multiple Templates</h4>
            <p className="text-gray-300">
              Choose from a variety of professionally designed resume templates.
            </p>
          </div>

          <div className="bg-[#252c3b] p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">💼</div>
            <h4 className="text-xl font-semibold mb-2 text-blue-400">Job-Specific Resumes</h4>
            <p className="text-gray-300">
              Optimize your resume for specific job roles and industries.
            </p>
          </div>
        </div>
      </div>


      <div className="bg-[#181e29] py-12 px-4 md:px-0 text-center mt-16">
        <h3 className="text-2xl md:text-3xl font-semibold mb-6">
          Ready to Create Your Resume?
        </h3>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-lg transition"
        >
          Login
        </button>
      </div>
    </section>
  );
}