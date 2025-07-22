import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faFileAlt,
  faBriefcase,
  faSearch,
  faChartLine,
  faLock,
  faMagic,
  faShieldAlt,
  faUsers,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function Hero() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <section id="hero" className="bg-[#1c2331] text-white">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between p-8 md:p-12">
        <img
          src="/images/hero_img (2).png"
          alt="hero image"
          className="w-[280px] sm:w-[320px] md:w-[380px] lg:w-[450px]
           mx-auto lg:mx-0
           mb-6 md:mb-0
           transform hover:scale-105 transition duration-500
           object-contain"
        />

        <div className="lg:ml-12 max-w-xl text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-blue-500">ResumeBuddy</span>
            <br />
            Your gateway to career success
          </h2>
          <p className="text-gray-400 mb-6 text-lg">
            Struggling with your resume? Build it with AI, then analyze its
            strengths—before recruiters do! Our platform helps you create
            professional resumes that stand out in today's competitive job
            market.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button
              onClick={() => navigate("/resume-builder")}
              className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition transform hover:-translate-y-1 hover:shadow-lg font-medium"
            >
              Resume Builder
            </button>
            <button
              onClick={() => navigate("/resume-analyzer")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1 hover:shadow-lg font-medium"
            >
              Resume Analyzer
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 md:px-12 bg-[#252c3b] mt-12">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Trusted by Professionals Worldwide
        </h3>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "1K+", label: "Resumes Created", icon: faUsers },
            { value: "95%", label: "Success Rate", icon: faLightbulb },
            { value: "50+", label: "Templates", icon: faFileAlt },
            { value: "24/7", label: "Support", icon: faShieldAlt },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#1c2331] rounded-lg hover:bg-[#1b202b] transition-all duration-500 hover:scale-105"
            >
              <FontAwesomeIcon
                icon={stat.icon}
                className="text-blue-400 text-3xl mb-3"
              />
              <div className="text-3xl font-bold text-blue-400 animate-pulse">
                {stat.value}
              </div>
              <p className="text-gray-300 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 px-4 md:px-12 text-center p-10">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Why Choose ResumeBuddy?
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          We provide the tools you need to create a resume that gets noticed by
          employers and recruiters.
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FontAwesomeIcon icon={faRocket} />,
              title: "AI-Powered Builder",
              description:
                "Our advanced AI analyzes your skills and experience to craft the perfect resume tailored to your career goals.",
            },
            {
              icon: <FontAwesomeIcon icon={faFileAlt} />,
              title: "Multiple Templates",
              description:
                "Choose from 50+ professionally designed templates that suit any industry or job level.",
            },
            {
              icon: <FontAwesomeIcon icon={faBriefcase} />,
              title: "Job-Specific Resumes",
              description:
                "Optimize your resume for specific job roles with our targeted suggestions and keywords.",
            },
            {
              icon: <FontAwesomeIcon icon={faSearch} />,
              title: "ATS Optimization",
              description:
                "Our resumes are designed to pass through Applicant Tracking Systems with ease.",
            },
            {
              icon: <FontAwesomeIcon icon={faChartLine} />,
              title: "Performance Analytics",
              description:
                "Get detailed feedback on how your resume performs and where to improve.",
            },
            {
              icon: <FontAwesomeIcon icon={faLock} />,
              title: "Secure Storage",
              description:
                "Your resumes are stored securely in the cloud and accessible anytime, anywhere.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-[#252c3b] p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-4 text-blue-400">
                {feature.title}
              </h4>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* fotter section  */}
      {!isAuthenticated ? (
        <div className="bg-[#181e29] py-16 px-4 md:px-0 text-center mt-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-4xl font-bold mb-6">
              Ready to Create Your Professional Resume?
            </h3>
            <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of professionals who've accelerated their careers
              with ResumeBuddy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1 hover:shadow-lg font-bold text-lg"
              >
                Get Started for Free
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-transparent border-2 border-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition transform hover:-translate-y-1 hover:shadow-lg font-bold text-lg"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      ) : (
        // section for logged-in users
        <div className="bg-[#181e29] py-16 px-4 md:px-0 text-center mt-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-4xl font-bold mb-6">
              Welcome to your Resume Dashboard!
            </h3>
            <p className="text-gray-200 mb-8 text-lg max-w-2xl mx-auto">
              Continue building your career success with these quick actions.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => navigate("/resume-builder")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1 hover:shadow-lg font-bold text-lg flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faMagic} />
                Create New Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
