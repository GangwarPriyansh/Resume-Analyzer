import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faCloudUploadAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
    } else {
      toast.error("Please upload a valid PDF file.");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setAnalysis("");
    // Reset file input
    document.getElementById("resumeUpload").value = "";
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    setAnalysis("");

    try {
      const uploadRes = await fetch("http://localhost:5000/api/upload/resume", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();

      // this is for my key call
      if (uploadRes.ok) {
        toast.success("Uploaded! Analyzing with AI...");
        const analyzeRes = await fetch(
          `http://localhost:5000/api/analyze/${uploadData.filename}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const analyzeData = await analyzeRes.json();
        if (analyzeRes.ok) {
          setAnalysis(analyzeData.analysis);
        } else {
          toast.error("AI Analysis failed");
        }
      } else {
        toast.error(uploadData.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#313946] text-white flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Analyze your Resume with AI
      </h2>

      <div className="bg-[#1c2331] w-full max-w-xl rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-4 px-6">
          <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faFileAlt} />
            Resume Analyzer
          </h2>
        </div>

        <div className="p-6">
          <label
            htmlFor="resumeUpload"
            className="border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center h-40 cursor-pointer hover:bg-[#2a2f3a] transition"
          >
            <FontAwesomeIcon
              icon={faCloudUploadAlt}
              size="2x"
              className="text-gray-400 mb-2"
            />
            <p className="text-gray-400">Upload PDF resume</p>
            <input
              type="file"
              id="resumeUpload"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {file && (
            <div className="text-sm text-gray-300 mt-2 flex items-center justify-center space-x-2">
              <span className="font-semibold">Selected file: {file.name}</span>
              <button
                onClick={handleRemoveFile}
                className="text-red-400 hover:text-red-600 transition"
                title="Remove File"
              >
                {/* <FontAwesomeIcon icon={faTimesCircle} />  */}
                <p>Remove File</p>
              </button>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>
        </div>
      </div>

      {/* ai output */}
      {analysis && (
        <div className="bg-[#1c2331] mt-6 p-6 rounded-xl shadow-xl w-full max-w-3xl">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">
            AI Analysis Result:
          </h3>
          {/* <p className="whitespace-pre-wrap text-gray-200 text-sm">
            {analysis}
          </p> */}
          <div
            className="prose prose-invert text-gray-200 text-md"
            dangerouslySetInnerHTML={{
              __html: analysis
               .replace(/^\*(.*$)/g, '. $1')
                .replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="text-blue-300 font-semibold text-base">$1</strong>'
                )
                .replace(/\n/g, "<br/>"),
            }}
          />
        </div>
      )}
    </div>
  );
}
