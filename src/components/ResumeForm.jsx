import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResumeForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(
    location.state || {
      name: "",
      contact: "",
      email: "",
      linkedin: "",
      github: "",
      summary: "",
      education: "",
      skills: "",
      projects: "",
      experience: "",
      achievements: "",
    }
  );

  const textareasRef = useRef({});

  useEffect(() => {
    // Resize all textareas after mount
    Object.values(textareasRef.current).forEach((textarea) => {
      if (textarea) autoResize(textarea);
    });
  }, []);

  const autoResize = (el) => {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    autoResize(e.target);
  };

  const isValid = () => {
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[\w-./?%&=#]*)?$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid Gmail address.");
      return false;
    }

    if (!urlRegex.test(formData.linkedin)) {
      toast.error("Please enter a valid LinkedIn URL.");
      return false;
    }

    if (!urlRegex.test(formData.github)) {
      toast.error("Please enter a valid GitHub URL.");
      return false;
    }
    if (!phoneRegex.test(formData.contact)) {
      toast.error("Please enter a valid 10-digit contact number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;
    // navigate("/resume-preview", { state: formData });

    toast.info("Details submitted! Please wait");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/improve-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
      const improvedText = await res.text();
      navigate("/resume-preview", {
        state: {
          rawText: improvedText,
          originalData: formData,
        },
      });
      toast.success("Resume Generated");
    } catch (err) {
      toast.error(err.message || "Failed to enhance resume content");
    }
  };

  const fields = [
    ["name", "Full Name"],
    ["contact", "Contact Number"],
    ["email", "Email"],
    ["linkedin", "LinkedIn URL"],
    ["github", "GitHub URL"],
    ["summary", "Summary"],
    ["education", "Education Details"],
    ["skills", "Skills"],
    ["projects", "Projects"],
    ["experience", "Experience"],
    ["achievements", "Achievements"],
  ];

  return (
    <div className="min-h-screen bg-[#3b3f45] py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-[#1c2331] rounded-xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-white text-center flex justify-center items-center gap-3 mb-6">
          <FontAwesomeIcon icon={faPencilAlt} />
          Resume Builder
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map(([field, label]) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-gray-300 font-medium mb-2"
              >
                {label}
              </label>
              <textarea
                ref={(el) => (textareasRef.current[field] = el)}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full bg-[#64666c] text-white border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                rows={1}
                required
              />
            </div>
          ))}

          <div className="flex justify-center gap-8">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-8 py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: "",
                  contact: "",
                  email: "",
                  linkedin: "",
                  github: "",
                  summary: "",
                  education: "",
                  skills: "",
                  projects: "",
                  experience: "",
                  achievements: "",
                });
                setTimeout(() => {
                  const textareas = document.querySelectorAll("textarea");
                  textareas.forEach((ta) => {
                    ta.style.height = "auto";
                    ta.style.height = ta.scrollHeight + "px";
                  });
                }, 0);
              }}
              className="bg-red-600 text-white font-semibold px-8 py-2 rounded hover:bg-red-700 transition"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}