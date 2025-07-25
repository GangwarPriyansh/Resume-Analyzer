// import React, { useEffect, useRef, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPencilAlt,
//   faTrash,
//   faPlus,
//   faUser,
//   faPhone,
//   faEnvelope,
//   faLink,
//   faGraduationCap,
//   faLightbulb,
//   faCodeBranch,
//   faBriefcase,
//   faTrophy,
//   faFileAlt,
//   faSpinner,
// } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   updateField,
//   clearFormData,
//   addCustomField,
//   deleteCustomField,
// } from "../slice/resumeformSlice";

// export default function ResumeForm() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const textareasRef = useRef({});
//   const [loading, setLoading] = useState(false);
//   const [cancle, setCancle] = useState(false);
//   const [customFieldName, setCustomFieldName] = useState("");

//   const formData = useSelector((state) => state.resumeForm.formData);
//   const customFields = useSelector((state) => state.resumeForm.customFields);

//   const fields = [
//     { field: "name", label: "Full Name", icon: faUser },
//     { field: "contact", label: "Contact Number", icon: faPhone },
//     { field: "email", label: "Email", icon: faEnvelope },
//     { field: "linkedin", label: "LinkedIn URL", icon: faLink },
//     { field: "github", label: "GitHub URL", icon: faCodeBranch },
//     { field: "summary", label: "Summary", icon: faFileAlt },
//     { field: "education", label: "Education Details", icon: faGraduationCap },
//     { field: "skills", label: "Skills", icon: faLightbulb },
//     { field: "projects", label: "Projects", icon: faCodeBranch },
//     { field: "experience", label: "Experience", icon: faBriefcase },
//     { field: "achievements", label: "Achievements", icon: faTrophy },
//   ];

//   useEffect(() => {
//     Object.values(textareasRef.current).forEach((textarea) => {
//       if (textarea) autoResize(textarea);
//     });
//   }, []);

//   const autoResize = (el) => {
//     el.style.height = "auto";
//     el.style.height = `${el.scrollHeight}px`;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(updateField({ name, value }));
//     autoResize(e.target);
//   };

//   const isValid = () => {
//     const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     const urlRegex =
//       /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[\w-./?%&=#]*)?$/;
//     const phoneRegex = /^\d{10}$/;

//     if (!emailRegex.test(formData.email)) {
//       toast.error("Please enter a valid email address.");
//       return false;
//     }
//     if (!phoneRegex.test(formData.contact)) {
//       toast.error("Please enter a valid 10-digit contact number.");
//       return false;
//     }

//     if (!urlRegex.test(formData.linkedin)) {
//       toast.error("Please enter a valid Linkedin URL");
//       return false;
//     }

//     if (!urlRegex.test(formData.github)) {
//       toast.error("Please enter a valid Github URL");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isValid()) return;

//     setLoading(true);

//     try {
//       const res = await fetch("https://resume-analyzer-6lys.onrender.com/api/improve-resume", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error(await res.text());

//       const improvedText = await res.text();
//       navigate("/resume-preview", {
//         state: {
//           rawText: improvedText,
//           originalData: formData,
//         },
//       });

//       toast.success("Resume Generated!");
//     } catch (err) {
//       toast.error(err.message || "Failed to enhance resume content.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddCustomField = () => {
//     const trimmedName = customFieldName.trim();
//     if (!trimmedName) return toast.error("Section name can't be empty.");
//     const fieldKey = trimmedName.toLowerCase().replace(/\s+/g, "_");

//     if (formData[fieldKey]) return toast.error("Section already exists.");

//     dispatch(addCustomField({ field: fieldKey, label: trimmedName }));
//     setCustomFieldName("");

//     setTimeout(() => {
//       const el = textareasRef.current[fieldKey];
//       if (el) autoResize(el);
//     }, 0);
//   };

//   const handleDeleteCustomField = (fieldKey) => {
//     dispatch(deleteCustomField(fieldKey));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1a202c] to-[#2d3748] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
//             Build Your Perfect Resume
//           </h1>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Fill in your details and let our AI craft a professional resume that
//             stands out
//           </p>
//         </div>

//         <div className="bg-[#212e41] rounded-2xl shadow-xl overflow-hidden border border-[#334155]">
//           <div className="p-6 sm:p-8">
//             <div className="flex items-center justify-center mb-8">
//               <div className="bg-blue-600 p-3 rounded-full">
//                 <FontAwesomeIcon
//                   icon={faPencilAlt}
//                   className="text-white text-2xl"
//                 />
//               </div>
//               <h2 className="ml-4 text-2xl font-bold text-white">
//                 Resume Details
//               </h2>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {fields.slice(0, 5).map(({ field, label, icon }) => (
//                   <div key={field} className="group">
//                     <div className="flex items-center mb-2">
//                       <FontAwesomeIcon
//                         icon={icon}
//                         className="text-blue-400 mr-2"
//                       />
//                       <label
//                         htmlFor={field}
//                         className="text-gray-300 font-medium group-hover:text-white transition-colors"
//                       >
//                         {label}
//                       </label>
//                     </div>
//                     <textarea
//                       ref={(el) => (textareasRef.current[field] = el)}
//                       id={field}
//                       name={field}
//                       value={formData[field]}
//                       onChange={handleChange}
//                       className="w-full bg-[#2d3748] text-white border border-[#3a4556] px-4 py-3 rounded-lg 
//                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
//                                 hover:border-blue-400 transition-all resize-none overflow-hidden"
//                       rows={1}
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>

//               {fields.slice(5).map(({ field, label, icon }) => (
//                 <div key={field} className="group">
//                   <div className="flex items-center mb-2">
//                     <FontAwesomeIcon
//                       icon={icon}
//                       className="text-blue-400 mr-2"
//                     />
//                     <label
//                       htmlFor={field}
//                       className="text-gray-300 font-medium group-hover:text-white transition-colors"
//                     >
//                       {label}
//                     </label>
//                   </div>
//                   <textarea
//                     ref={(el) => (textareasRef.current[field] = el)}
//                     id={field}
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className="w-full bg-[#2d3748] text-white border border-[#3a4556] px-4 py-3 rounded-lg 
//                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
//                               hover:border-blue-400 transition-all resize-none overflow-hidden"
//                     rows={3}
//                     required
//                   />
//                 </div>
//               ))}

//               {customFields.map(({ field, label }) => (
//                 <div key={field} className="group">
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="flex items-center">
//                       <FontAwesomeIcon
//                         icon={faPlus}
//                         className="text-blue-400 mr-2"
//                       />
//                       <label
//                         htmlFor={field}
//                         className="text-gray-300 font-medium group-hover:text-white transition-colors"
//                       >
//                         {label}
//                       </label>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => handleDeleteCustomField(field)}
//                       className="text-red-400 hover:text-red-300 transition-colors p-1"
//                       title="Delete field"
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </div>
//                   <textarea
//                     ref={(el) => (textareasRef.current[field] = el)}
//                     id={field}
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className="w-full bg-[#2d3748] text-white border border-[#3a4556] px-4 py-3 rounded-lg 
//                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
//                               hover:border-blue-400 transition-all resize-none overflow-hidden"
//                     rows={3}
//                     required
//                   />
//                 </div>
//               ))}
//               <div className="flex flex-col sm:flex-row gap-4 items-center mt-8">
//                 <div className="flex-1 w-full sm:w-auto">
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Enter new section name"
//                       value={customFieldName}
//                       onChange={(e) => setCustomFieldName(e.target.value)}
//                       className="w-full px-4 py-3 pl-10 rounded-lg bg-[#2d3748] text-white border border-[#3a4556]
//                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
//                                 hover:border-blue-400 transition-all"
//                     />
//                     <FontAwesomeIcon
//                       icon={faPlus}
//                       className="absolute left-3 top-4 text-blue-400"
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={handleAddCustomField}
//                   className={`${
//                     loading || cancle ? "opacity-50 cursor-not-allowed" : ""
//                   } bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 transition`}
//                   disabled={loading || cancle}
//                 >
//                   <FontAwesomeIcon icon={faPlus} />
//                   <span>Add Section</span>
//                 </button>
//               </div>

//               <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-10">
//                 {/* Generate Resume Button */}
//                 <button
//                   type="submit"
//                   className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-lg 
//                   hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 
//                   shadow-lg min-w-[140px] flex items-center justify-center gap-2 ${
//                     loading || cancle ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                   disabled={cancle}
//                 >
//                   {loading ? (
//                     <>
//                       <FontAwesomeIcon
//                         icon={faSpinner}
//                         className="animate-spin h-4 w-4"
//                       />
//                       Processing...
//                     </>
//                   ) : (
//                     "Generate Resume"
//                   )}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     dispatch(clearFormData());
//                     setTimeout(() => {
//                       Object.values(textareasRef.current).forEach(
//                         (textarea) => {
//                           if (textarea) {
//                             textarea.style.height = "auto";
//                             textarea.style.height = `${textarea.scrollHeight}px`;
//                           }
//                         }
//                       );
//                     }, 0);
//                   }}
//                   className={`${
//                     loading || cancle ? "opacity-50 cursor-not-allowed" : ""
//                   } bg-[#3a4556] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#4a5568] 
//                     transition-all transform hover:-translate-y-0.5 shadow-lg min-w-[140px]`}
//                   disabled={loading || cancle}
//                 >
//                   Clear Form
//                 </button>

//                 <button
//                   type="button"
//                   className={`${
//                     loading || cancle ? "opacity-50 cursor-not-allowed" : ""
//                   } bg-red-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-red-700
//                   transition-all transform hover:-translate-y-0.5 shadow-lg min-w-[140px]`}
//                   disabled={loading}
//                   onClick={async () => {
//                     const requiredFields = [
//                       "name",
//                       "contact",
//                       "email",
//                       "linkedin",
//                       "github",
//                       "summary",
//                       "education",
//                       "skills",
//                       "projects",
//                       "experience",
//                       "achievements",
//                     ];

//                     const allRequiredFilled = requiredFields.every(
//                       (key) => formData[key]?.trim() !== ""
//                     );

//                     if (!allRequiredFilled) {
//                       navigate("/");
//                       return;
//                     }

//                     setCancle(true);
//                     try {
//                       const res = await fetch(
//                         "https://resume-analyzer-6lys.onrender.com/api/improve-resume",
//                         {
//                           method: "POST",
//                           headers: { "Content-Type": "application/json" },
//                           body: JSON.stringify(formData),
//                         }
//                       );
//                       if (!res.ok) throw new Error(await res.text());
//                       const improvedText = await res.text();
//                       navigate("/resume-preview", {
//                         state: {
//                           rawText: improvedText,
//                           originalData: formData,
//                         },
//                       });
//                     } catch (err) {
//                       toast.error(
//                         err.message || "Failed to enhance resume content."
//                       );
//                     } finally {
//                       setCancle(false);
//                     }
//                   }}
//                 >
//                   {cancle ? (
//                     <>
//                       <FontAwesomeIcon
//                         icon={faSpinner}
//                         className="animate-spin mr-2"
//                       />
//                       Cancelling...
//                     </>
//                   ) : (
//                     "Cancel"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField, addCustomField, updateCustomField, removeCustomField } from "../redux/resumeSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const ResumeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.resume.form);
  const customFields = useSelector((state) => state.resume.customFields);

  const [buttonText, setButtonText] = useState("Submit");

  // Prefill user info
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { name, email, number } = JSON.parse(storedUser);
      dispatch(updateField({ name: "name", value: name }));
      dispatch(updateField({ name: "email", value: email }));
      dispatch(updateField({ name: "contact", value: number }));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(updateField({ name: e.target.name, value: e.target.value }));
    autoResize(e);
  };

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleCustomChange = (id, key, value) => {
    dispatch(updateCustomField({ id, key, value }));
  };

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^\d{10}$/;
    const urlRegex = /^(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w+\/?.*$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid Gmail address.");
      return false;
    }
    if (!phoneRegex.test(formData.contact)) {
      toast.error("Contact number should be 10 digits.");
      return false;
    }
    if (formData.linkedin && !urlRegex.test(formData.linkedin)) {
      toast.error("Enter a valid LinkedIn URL.");
      return false;
    }
    if (formData.github && !urlRegex.test(formData.github)) {
      toast.error("Enter a valid GitHub URL.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setButtonText("Processing...");
    toast.success("Details submitted");

    // Example: send form data to backend if needed
    // const res = await fetch("/api/analyze", {...});

    navigate("/resume-preview");
  };

  const handleAddSection = () => {
    const id = uuidv4();
    dispatch(addCustomField({ id, fieldName: "", value: "" }));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Build Your Resume</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "contact", "linkedin", "github", "education", "skills", "experience", "projects"].map(
          (field) => (
            <div key={field}>
              <label className="block font-medium capitalize">{field}</label>
              <textarea
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                onInput={autoResize}
                className="w-full border rounded p-2 resize-none"
                placeholder={`Enter ${field}`}
                rows={1}
              />
            </div>
          )
        )}

        {/* Dynamic Custom Fields */}
        {customFields.map((field) => (
          <div key={field.id} className="flex items-start gap-2">
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Section Title"
                value={field.fieldName}
                onChange={(e) => handleCustomChange(field.id, "fieldName", e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="w-2/3">
              <textarea
                value={field.value}
                onChange={(e) => handleCustomChange(field.id, "value", e.target.value)}
                onInput={autoResize}
                className="w-full border rounded p-2 resize-none"
                placeholder="Section Content"
                rows={1}
              />
            </div>
            <button
              type="button"
              className="text-red-500"
              onClick={() => dispatch(removeCustomField(field.id))}
            >
              🗑️
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddSection} className="bg-blue-100 px-3 py-1 rounded">
          + Add Section
        </button>

        <button type="submit" className="block w-full bg-blue-600 text-white py-2 rounded">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;