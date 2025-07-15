import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faUsers,
  faLightbulb,
  faShieldAlt,
  faHeart,
  faFileAlt,
  faArrowRightLong
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function About() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <section className="bg-[#1c2331] text-white min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between p-8 md:p-12">
        <div className="lg:mr-12 max-w-2xl text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-blue-500">ResumeBuddy</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Revolutionizing resume building with AI-powered tools to help you
            land your dream job. Our platform combines cutting-edge technology
            with industry insights to create resumes that get noticed by both
            hiring managers and ATS systems.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-lg transition transform hover:-translate-y-1 font-medium">
              Meet The Team
            </button>
            <button className="bg-blue-600  hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition transform hover:-translate-y-1 font-medium">
              Our Mission
            </button>
          </div>
        </div>
        <img
          src="/images/about_img1.png"
          alt="Team working together"
          className="w-[600px] max-w-full mt-10 lg:mt-0 transform hover:scale-105 transition duration-500"
        />
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 md:px-12 bg-[#252c3b] mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "1K+", label: "Users Trust Us", icon: faUsers },
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

      {/* story section */}
      <div className="max-w-6xl mx-auto py-16 px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-blue-500">Story</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Founded in 2023, ResumeBuddy was born from a simple idea: everyone
            deserves a resume that truly represents their potential.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              The Beginning
            </h3>
            <p className="text-gray-400 mb-6">
              After seeing countless qualified candidates struggle with outdated
              resume formats, our founders set out to create an AI-powered
              solution that levels the playing field.
            </p>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Today</h3>
            <p className="text-gray-400">
              Now trusted by thousands worldwide, we combine cutting-edge
              technology with human-centered design to help job seekers showcase
              their best selves.
            </p>
          </div>
          <div className="bg-[#252c3b] p-3 rounded-xl border border-[#3a4556] transform hover:scale-105 transition duration-500">
            <img
              src="/images/about_img2.png"
              alt="Team working"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-[#252c3b] py-16 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Our <span className="text-blue-500">Values</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: faRocket,
              title: "Innovation",
              description:
                "We constantly evolve our technology to stay ahead of hiring trends.",
            },
            {
              icon: faHeart,
              title: "Empathy",
              description:
                "We design for real people with real career challenges.",
            },
            {
              icon: faShieldAlt,
              title: "Integrity",
              description:
                "Your data privacy and security are our top priority.",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="bg-[#1c2331] p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <FontAwesomeIcon icon={value.icon} className="text-4xl mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                {value.title}
              </h3>
              <p className="text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {!isAuthenticated && (
        <>
          <div className="bg-[#181e29] py-20 px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                Join thousands who've accelerated their job search with
                ResumeBuddy.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1 hover:shadow-lg font-bold text-lg flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faArrowRightLong} />
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
