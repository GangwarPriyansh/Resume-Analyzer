// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setAnalysisResult, clearAnalysisResult } from "../slice/analysisSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileAlt,
//   faCloudUploadAlt,
//   faTrash,
//   faSpinner,
//   faRobot,
//   faEye,
//   faEyeSlash,
// } from "@fortawesome/free-solid-svg-icons";
// import { toast } from "react-toastify";

// export default function ResumeAnalyzer() {
//   const dispatch = useDispatch();
//   const analysis = useSelector((state) => state.analysis.result);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);
//   const [filePreviewUrl, setFilePreviewUrl] = useState(null);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (filePreviewUrl) {
//         URL.revokeObjectURL(filePreviewUrl);
//       }
//     };
//   }, [filePreviewUrl]);

//   // Restore file on page refresh
//   useEffect(() => {
//     const savedFileData = sessionStorage.getItem("resumeFileData");
//     if (savedFileData) {
//       try {
//         const fileData = JSON.parse(savedFileData);
//         setFile(fileData);
//         setFilePreviewUrl(
//           URL.createObjectURL(
//             new Blob([fileData.content], { type: fileData.type })
//           )
//         );
//       } catch (err) {
//         console.error("Error restoring file:", err);
//         sessionStorage.removeItem("resumeFileData");
//       }
//     }
//   }, []);

//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     const isPDF =
//       selected.type === "application/pdf" ||
//       selected.name.toLowerCase().endsWith(".pdf");

//     if (isPDF) {
//       if (selected.size > 10 * 1024 * 1024) {
//         toast.error("File too large. Please select a PDF under 10MB.");
//         return;
//       }

//       setFile(selected);
//       const previewUrl = URL.createObjectURL(selected);
//       setFilePreviewUrl(previewUrl);

//       // Save to session storage
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const fileData = {
//           name: selected.name,
//           type: selected.type,
//           size: selected.size,
//           lastModified: selected.lastModified,
//           content: event.target.result,
//         };
//         sessionStorage.setItem("resumeFileData", JSON.stringify(fileData));
//       };
//       reader.readAsDataURL(selected);
//     } else {
//       toast.error("Please upload a valid PDF file.");
//       e.target.value = "";
//     }
//   };

//   const handleRemoveFile = () => {
//     if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
//     setFile(null);
//     setFilePreviewUrl(null);
//     dispatch(clearAnalysisResult());
//     sessionStorage.removeItem("resumeFileData");
//     document.getElementById("resumeUpload").value = "";
//   };

//   const handleSubmit = async () => {
//     if (!file) {
//       toast.error("No file selected!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("resume", file);

//     setLoading(true);
//     dispatch(clearAnalysisResult());

//     try {
//       const res = await fetch(
//         "https://resume-analyzer-6lys.onrender.com/api/upload/resume",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Upload failed");
//       }

//       toast.success("Analyzed by AI!");
//       dispatch(setAnalysisResult(data.analysis));
//     } catch (err) {
//       console.error("Upload/AI Error:", err);
//       toast.error(
//         err.message.includes("Failed to fetch")
//           ? "Network error. Please check your connection or use Wi-Fi."
//           : `Upload failed: ${err.message}`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1a202c] to-[#2d3748] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
//             Analyze Your Resume with AI
//           </h1>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Upload your resume and get instant feedback from our AI analyzer
//           </p>
//         </div>

//         <div className="bg-[#1e293b] rounded-2xl shadow-xl overflow-hidden border border-[#334155]">
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-5 px-6">
//             <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-3">
//               <FontAwesomeIcon icon={faFileAlt} className="text-white" />
//               Resume Analyzer
//             </h2>
//           </div>

//           <div className="p-6 sm:p-8">
//             <label
//               htmlFor="resumeUpload"
//               className="border-2 border-dashed border-[#3a4556] rounded-xl flex flex-col items-center justify-center h-48 cursor-pointer hover:bg-[#2d3748] transition-all group"
//             >
//               <div className="bg-blue-600/20 p-4 rounded-full mb-3 group-hover:bg-blue-600/30">
//                 <FontAwesomeIcon
//                   icon={faCloudUploadAlt}
//                   size="2x"
//                   className="text-blue-400 group-hover:text-blue-300"
//                 />
//               </div>
//               <p className="text-gray-400 group-hover:text-white">
//                 {file ? "Replace PDF file" : "Upload your resume"}
//               </p>
//               <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-400">
//                 (Only PDF accepted, max 10MB)
//               </p>
//               <input
//                 type="file"
//                 id="resumeUpload"
//                 accept=".pdf"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </label>

//             {file && (
//               <div className="mt-4">
//                 {/* <div className="flex items-center justify-between bg-[#2d3748] px-4 py-3 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <FontAwesomeIcon
//                       icon={faFileAlt}
//                       className="text-blue-400"
//                     />
//                     <div className="flex flex-col">
//                       <span className="text-gray-300 font-medium truncate max-w-xs">
//                         {file.name}
//                       </span>
//                       {showPreview && (
//                         <div className="mt-1 text-xs text-gray-400">
//                           File size: {Math.round(file.size / 1024)} KB
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setShowPreview(!showPreview)}
//                       className="text-gray-400 hover:text-gray-300 p-1"
//                       title={showPreview ? "Hide details" : "Show details"}
//                     >
//                       <FontAwesomeIcon
//                         icon={showPreview ? faEyeSlash : faEye}
//                       />
//                     </button>
//                     <button
//                       onClick={handleRemoveFile}
//                       className="text-red-400 hover:text-red-300 p-1"
//                       title="Remove file"
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </div>
//                 </div> */}
//                 <div className="flex items-center justify-between bg-[#2d3748] px-4 py-3 rounded-lg flex-nowrap min-w-0">
//                   <div className="flex items-center gap-3 min-w-0">
//                     <FontAwesomeIcon
//                       icon={faFileAlt}
//                       className="text-blue-400 flex-shrink-0"
//                     />
//                     <div className="flex flex-col min-w-0">
//                       <span className="text-gray-300 font-medium truncate max-w-[120px] sm:max-w-xs">
//                         {file.name}
//                       </span>
//                       {showPreview && (
//                         <div className="mt-1 text-xs text-gray-400">
//                           File size: {Math.round(file.size / 1024)} KB
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 flex-shrink-0">
//                     <button
//                       onClick={() => setShowPreview(!showPreview)}
//                       className="text-gray-400 hover:text-gray-300 p-1"
//                       title={showPreview ? "Hide details" : "Show details"}
//                     >
//                       <FontAwesomeIcon
//                         icon={showPreview ? faEyeSlash : faEye}
//                       />
//                     </button>
//                     <button
//                       onClick={handleRemoveFile}
//                       className="text-red-400 hover:text-red-300 p-1"
//                       title="Remove file"
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </div>
//                 </div>

//                 {showPreview && filePreviewUrl && (
//                   <div className="mt-2 bg-[#2d3748] p-4 rounded-lg border border-[#334155]">
//                     {/(iPhone|iPad|iPod|Android)/i.test(navigator.userAgent) ? (
//                       <a
//                         href={filePreviewUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 underline text-sm"
//                       >
//                         View your uploaded PDF
//                       </a>
//                     ) : (
//                       <iframe
//                         src={filePreviewUrl}
//                         className="w-full h-96"
//                         title="PDF Preview"
//                       />
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             <div className="mt-8">
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading || !file}
//                 className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg
//                             hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5
//                             shadow-lg flex items-center justify-center gap-2
//                             ${
//                               !file || loading
//                                 ? "opacity-70 cursor-not-allowed"
//                                 : ""
//                             }`}
//               >
//                 {loading ? (
//                   <>
//                     <FontAwesomeIcon
//                       icon={faSpinner}
//                       className="animate-spin"
//                     />
//                     Analyzing...
//                   </>
//                 ) : (
//                   <>
//                     <FontAwesomeIcon icon={faFileAlt} />
//                     Analyze Resume
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {analysis && (
//           <div className="bg-[#1e293b] mt-8 p-6 sm:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#334155]">
//             <div className="flex items-center mb-6">
//               <div className="mr-3">
//                 <FontAwesomeIcon
//                   icon={faRobot}
//                   className="text-blue-400 text-2xl"
//                 />
//               </div>
//               <h3 className="text-2xl font-bold text-white">
//                 AI Analysis Results
//               </h3>
//             </div>
//             <div
//               className="prose prose-invert max-w-none text-gray-200"
//               dangerouslySetInnerHTML={{
//                 __html: analysis
//                   .replace(/^\*(.*$)/g, ". $1")
//                   .replace(
//                     /\*\*(.*?)\*\*/g,
//                     '<strong class="text-blue-300 font-semibold">$1</strong>'
//                   )
//                   .replace(/\n/g, "<br/>")
//                   .replace(
//                     /### (.*?)\n/g,
//                     '<h3 class="text-xl font-semibold text-white mt-6 mb-3">$1</h3>'
//                   ),
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnalysisResult, clearAnalysisResult } from "../slice/analysisSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faCloudUploadAlt,
  faTrash,
  faSpinner,
  faRobot,
  faEye,
  faEyeSlash,
  faExclamationTriangle,
  faLightbulb,
  faCheckCircle,
  faTimes,
  faPlus,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function ResumeAnalyzer() {
  const dispatch = useDispatch();
  const analysis = useSelector((state) => state.analysis.result);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [filePreviewUrl]);

  // Restore file on page refresh
  useEffect(() => {
    const savedFileData = sessionStorage.getItem("resumeFileData");
    if (savedFileData) {
      try {
        const fileData = JSON.parse(savedFileData);
        setFile(fileData);
        setFilePreviewUrl(
          URL.createObjectURL(
            new Blob([fileData.content], { type: fileData.type })
          )
        );
      } catch (err) {
        console.error("Error restoring file:", err);
        sessionStorage.removeItem("resumeFileData");
      }
    }
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const isPDF =
      selected.type === "application/pdf" ||
      selected.name.toLowerCase().endsWith(".pdf");

    if (isPDF) {
      if (selected.size > 10 * 1024 * 1024) {
        toast.error("File too large. Please select a PDF under 10MB.");
        return;
      }

      setFile(selected);
      const previewUrl = URL.createObjectURL(selected);
      setFilePreviewUrl(previewUrl);

      // Save to session storage
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = {
          name: selected.name,
          type: selected.type,
          size: selected.size,
          lastModified: selected.lastModified,
          content: event.target.result,
        };
        sessionStorage.setItem("resumeFileData", JSON.stringify(fileData));
      };
      reader.readAsDataURL(selected);
    } else {
      toast.error("Please upload a valid PDF file.");
      e.target.value = "";
    }
  };

  const handleRemoveFile = () => {
    if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    setFile(null);
    setFilePreviewUrl(null);
    dispatch(clearAnalysisResult());
    sessionStorage.removeItem("resumeFileData");
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
      const res = await fetch(
        "https://resume-analyzer-6lys.onrender.com/api/upload/resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      toast.success("Analyzed by AI!");
      dispatch(setAnalysisResult(data.analysis));
    } catch (err) {
      console.error("Upload/AI Error:", err);
      toast.error(
        err.message.includes("Failed to fetch")
          ? "Network error. Please check your connection or use Wi-Fi."
          : `Upload failed: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const formatAnalysisContent = (content) => {
    if (!content) return "";

    // Split content into sections
    const sections = content.split(/(?=\d+\.\s)/);
    
    return sections.map((section, index) => {
      if (!section.trim()) return null;

      // Check if this is a main section (starts with number)
      const isMainSection = /^\d+\.\s/.test(section.trim());
      
      if (isMainSection) {
        const lines = section.trim().split('\n');
        const title = lines[0].replace(/^\d+\.\s/, '');
        const content = lines.slice(1).join('\n');

        // Determine section type based on keywords
        const getSectionType = (title) => {
          const titleLower = title.toLowerCase();
          if (titleLower.includes('missing') || titleLower.includes('lack')) {
            return { icon: faExclamationTriangle, color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/20' };
          } else if (titleLower.includes('improvement') || titleLower.includes('enhance')) {
            return { icon: faArrowUp, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/20' };
          } else if (titleLower.includes('suggestion') || titleLower.includes('recommend')) {
            return { icon: faLightbulb, color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' };
          } else {
            return { icon: faCheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20' };
          }
        };

        const sectionType = getSectionType(title);

        return (
          <div key={index} className={`${sectionType.bgColor} ${sectionType.borderColor} border rounded-xl p-6 mb-6 backdrop-blur-sm`}>
            <div className="flex items-start gap-4">
              <div className={`${sectionType.color} mt-1`}>
                <FontAwesomeIcon icon={sectionType.icon} className="text-lg" />
              </div>
              <div className="flex-1">
                <h4 className={`text-lg font-semibold ${sectionType.color} mb-3`}>
                  {title}
                </h4>
                <div className="space-y-2">
                  {content.split('\n').map((line, lineIndex) => {
                    if (!line.trim()) return null;
                    
                    // Format bullet points
                    if (line.trim().startsWith('*')) {
                      const text = line.replace(/^\*\s*/, '');
                      const parts = text.split(':');
                      
                      return (
                        <div key={lineIndex} className="flex items-start gap-3 text-gray-300">
                          <div className={`${sectionType.color} mt-1.5`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                          </div>
                          <div className="flex-1">
                            {parts.length > 1 ? (
                              <>
                                <span className="font-medium text-white">{parts[0]}:</span>
                                <span className="ml-1">{parts.slice(1).join(':')}</span>
                              </>
                            ) : (
                              <span>{text}</span>
                            )}
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <p key={lineIndex} className="text-gray-300 leading-relaxed">
                        {line.trim()}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      }

      return null;
    }).filter(Boolean);
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
              <div className="bg-blue-600/20 p-4 rounded-full mb-3 group-hover:bg-blue-600/30">
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                  size="2x"
                  className="text-blue-400 group-hover:text-blue-300"
                />
              </div>
              <p className="text-gray-400 group-hover:text-white">
                {file ? "Replace PDF file" : "Upload your resume"}
              </p>
              <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-400">
                (Only PDF accepted, max 10MB)
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
              <div className="mt-4">
                <div className="flex items-center justify-between bg-[#2d3748] px-4 py-3 rounded-lg flex-nowrap min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="text-blue-400 flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-gray-300 font-medium truncate max-w-[120px] sm:max-w-xs">
                        {file.name}
                      </span>
                      {showPreview && (
                        <div className="mt-1 text-xs text-gray-400">
                          File size: {Math.round(file.size / 1024)} KB
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="text-gray-400 hover:text-gray-300 p-1"
                      title={showPreview ? "Hide details" : "Show details"}
                    >
                      <FontAwesomeIcon
                        icon={showPreview ? faEyeSlash : faEye}
                      />
                    </button>
                    <button
                      onClick={handleRemoveFile}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Remove file"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>

                {showPreview && filePreviewUrl && (
                  <div className="mt-2 bg-[#2d3748] p-4 rounded-lg border border-[#334155]">
                    {/(iPhone|iPad|iPod|Android)/i.test(navigator.userAgent) ? (
                      <a
                        href={filePreviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline text-sm"
                      >
                        View your uploaded PDF
                      </a>
                    ) : (
                      <iframe
                        src={filePreviewUrl}
                        className="w-full h-96"
                        title="PDF Preview"
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="mt-8">
              <button
                onClick={handleSubmit}
                disabled={loading || !file}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg
                            hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5
                            shadow-lg flex items-center justify-center gap-2
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
          <div className="mt-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#1e293b] to-[#334155] p-6 sm:p-8 rounded-t-2xl border-t border-x border-[#475569]">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-4">
                  <FontAwesomeIcon
                    icon={faRobot}
                    className="text-white text-2xl"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">
                    AI Analysis Results
                  </h3>
                  <p className="text-blue-300 text-sm">
                    Here are actionable insights to improve your resume
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-[#1e293b] p-6 sm:p-8 rounded-b-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-b border-x border-[#334155]">
              <div className="space-y-6">
                {formatAnalysisContent(analysis)}
              </div>
              
              {/* Summary Footer */}
              <div className="mt-8 pt-6 border-t border-[#334155]">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FontAwesomeIcon icon={faLightbulb} className="text-yellow-400" />
                    <span className="font-semibold text-yellow-400">Pro Tip</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Focus on implementing the missing skills and improving the highlighted sections to significantly boost your resume's impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}