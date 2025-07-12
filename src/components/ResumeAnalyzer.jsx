import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnalysisResult, clearAnalysisResult } from "../slice/analysisSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faCloudUploadAlt,
  faTrash,
  faSpinner,
  faRobot
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function ResumeAnalyzer() {
  const dispatch = useDispatch();
  const analysis = useSelector((state) => state.analysis.result);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedFileName = sessionStorage.getItem("resumeFileName");
    if (savedFileName) {
      setFile({ name: savedFileName });
    }
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      sessionStorage.setItem("resumeFileName", selected.name);
    } else {
      toast.error("Please upload a valid PDF file.");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    dispatch(clearAnalysisResult());
    sessionStorage.removeItem("resumeFileName");
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
    dispatch(clearAnalysisResult());

    try {
      const res = await fetch("http://localhost:5000/api/upload/resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Analyzed by AI!");
        dispatch(setAnalysisResult(data.analysis));
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload/AI Error:", err);
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a202c] to-[#2d3748] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
            Analyze Your Resume with AI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Upload your resume and get instant feedback from our AI analyzer
          </p>
        </div>

        <div className="bg-[#1e293b] rounded-2xl shadow-xl overflow-hidden border border-[#334155]">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-5 px-6">
            <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faFileAlt} className="text-white" />
              Resume Analyzer
            </h2>
          </div>

          <div className="p-6 sm:p-8">
            <label
              htmlFor="resumeUpload"
              className="border-2 border-dashed border-[#3a4556] rounded-xl flex flex-col items-center justify-center h-48 cursor-pointer hover:bg-[#2d3748] transition-all group"
            >
              <div className="bg-blue-600/20 p-4 rounded-full mb-3 group-hover:bg-blue-600/30 transition-all">
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                  size="2x"
                  className="text-blue-400 group-hover:text-blue-300 transition-colors"
                />
              </div>
              <p className="text-gray-400 group-hover:text-white transition-colors">
                {file ? "Replace PDF file" : "Upload your resume"}
              </p>
              <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">
                (Only PDF accepted)
              </p>
              <input
                type="file"
                id="resumeUpload"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {file && (
              <div className="mt-4 flex items-center justify-between bg-[#2d3748] px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    className="text-blue-400 mr-3"
                  />
                  <span className="text-gray-300 font-medium truncate max-w-xs">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span className="hidden sm:inline">Remove</span>
                </button>
              </div>
            )}

            <div className="mt-8">
              <button
                onClick={handleSubmit}
                disabled={loading || !file}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg 
                          hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5
                          shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2
                          ${
                            !file || loading
                              ? "opacity-70 cursor-not-allowed"
                              : ""
                          }`}
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faFileAlt} />
                    Analyze Resume
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {analysis && (
          <div className="bg-[#1e293b] mt-8 p-6 sm:p-8 rounded-2xl shadow-xl border border-[#334155]">
            <div className="flex items-center mb-6">
              <div className="mr-3">
                <FontAwesomeIcon
                  icon={faRobot}
                  className="text-blue-400 text-2xl"
                />
              </div>
              <h3 className="text-2xl font-bold text-white">
                AI Analysis Results
              </h3>
            </div>
            <div
              className="prose prose-invert max-w-none text-gray-200"
              dangerouslySetInnerHTML={{
                __html: analysis
                  .replace(/^\*(.*$)/g, ". $1")
                  .replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-blue-300 font-semibold">$1</strong>'
                  )
                  .replace(/\n/g, "<br/>")
                  .replace(
                    /### (.*?)\n/g,
                    '<h3 class="text-xl font-semibold text-white mt-6 mb-3">$1</h3>'
                  ),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
