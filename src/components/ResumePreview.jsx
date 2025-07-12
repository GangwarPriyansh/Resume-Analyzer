import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

export default function ResumePreview() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.rawText) {
    return (
      <p className="text-center text-white mt-10">No resume data found.</p>
    );
  }

  const handlePrint = () => {
    const resumeElement = document.getElementById("resume-content");
    const opt = {
      margin: 0,
      filename: `${state.originalData?.name || "Resume"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(resumeElement).save();
  };

  // Convert plain text to formatted HTML

  const formatResumeText = (text) => {
    const lines = text.split("\n");
    const elements = [];
    let currentSection = null;

    lines.forEach((line, i) => {
      if (line.toUpperCase() === line && line.trim().length > 0) {
        if (currentSection) {
          elements.push(
            <hr key={`hr-${currentSection}`} className="my-2 border-gray-400" />
          );
        }
        currentSection = line;
        // Section heading
        elements.push(
          <h2 key={i} className="text-lg font-bold mt-3 mb-2 ">
            {line}
          </h2>
        );
      } else if (line.startsWith("- ")) {
        // Bullet point
        elements.push(
          <li key={i} className="ml-5 font-sans text-sm">
            {line.substring(2)}
          </li>
        );
      } else if (line.trim() === " ") {
      } else {
        // Regular text
        elements.push(
          <p key={i} className="mb-1 font-sans text-sm">
            {line}
          </p>
        );
      }
    });
    return elements;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a202c] to-[#2d3748] py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-start font-bold text-white text-center p-5 text-4xl mb-4">
        <h1>This is the preview of your Awesome Resume!</h1>
      </div>
      <div
        id="resume-content"
        className="max-w-3xl mx-auto bg-white px-8 pt-4 pb-10 print:shadow-none print:border-none print:ring-0"
        style={{ boxShadow: "none", border: "none" }}
      >
        {/* name  ko center kar raha hai*/}
        <h1 className="text-3xl font-bold text-center mb-2">
          {state.originalData.name}
        </h1>

        {/* contact details below name aye ga */}
        <p className="text-center text-sm text-gray-700 mb-4">
          {state.originalData.contact} | {state.originalData.email} |{" "}
          <a
            href={
              state.originalData.linkedin.startsWith("http")
                ? state.originalData.linkedin
                : `https://${state.originalData.linkedin}`
            }
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-600"
          >
            LinkedIn
          </a>{" "}
          |{" "}
          <a
            href={
              state.originalData.github.startsWith("http")
                ? state.originalData.github
                : `https://${state.originalData.github}`
            }
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-600"
          >
            GitHub
          </a>
        </p>

        <hr className="my-4 border-gray-400" />

        {/* ai generated text */}
        {formatResumeText(state.rawText)}
      </div>

      <div className="mt-6 flex justify-center print:hidden gap-8">
        <button
          onClick={() =>
            navigate("/resume-builder", { state: state.originalData })
          }
          className="bg-[#3a4556] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#4a5568] 
                            transition-all transform hover:-translate-y-0.5 shadow-lg"
        >
          Edit
        </button>
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1 hover:shadow-lg font-medium"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
