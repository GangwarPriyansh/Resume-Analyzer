import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash,faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  clearFormData,
  addCustomField,
  deleteCustomField,
} from "../slice/resumeformSlice";

export default function ResumeForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const textareasRef = useRef({});
  const [loading, setLoading] = useState(false);
  const [customFieldName, setCustomFieldName] = useState("");

  const formData = useSelector((state) => state.resumeForm.formData);
  const customFields = useSelector((state) => state.resumeForm.customFields);

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

  useEffect(() => {
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
    dispatch(updateField({ name, value }));
    autoResize(e.target);
  };

  const isValid = () => {
    const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const urlRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[\w-./?%&=#]*)?$/;
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
      toast.error("Please enter a valid 10-digit contact number.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/improve-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(await res.text());

      const improvedText = await res.text();
      navigate("/resume-preview", {
        state: {
          rawText: improvedText,
          originalData: formData,
        },
      });

      toast.success("Resume Generated!");
    } catch (err) {
      toast.error(err.message || "Failed to enhance resume content.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomField = () => {
    const trimmedName = customFieldName.trim();
    if (!trimmedName) return toast.error("Section name can't be empty.");
    const fieldKey = trimmedName.toLowerCase().replace(/\s+/g, "_");

    if (formData[fieldKey]) return toast.error("Section already exists.");

    dispatch(addCustomField({ field: fieldKey, label: trimmedName }));
    setCustomFieldName("");

    setTimeout(() => {
      const el = textareasRef.current[fieldKey];
      if (el) autoResize(el);
    }, 0);
  };

  const handleDeleteCustomField = (fieldKey) => {
    dispatch(deleteCustomField(fieldKey));
  };

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

          {customFields.map(({ field, label }) => (
            <div key={field}>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={field} className="text-gray-300 font-medium">
                  {label}
                </label>
                <button
                  type="button"
                  onClick={() => handleDeleteCustomField(field)}
                  className="text-red-400 hover:text-red-600 transition"
                  title="Delete field"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
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

          <div className="flex gap-4 items-center mt-2">
            <input
              type="text"
              placeholder="Enter new section name"
              value={customFieldName}
              onChange={(e) => setCustomFieldName(e.target.value)}
              className="flex-1 px-4 py-2 rounded bg-[#2b2f3b] text-white border border-gray-600"
            />
            <button
              type="button"
              onClick={handleAddCustomField}
              className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 transition"
            > 
              <p className="gap-6">
              <FontAwesomeIcon icon={faPlus}/>
                Add Section
              </p>
            </button>
          </div>

          <div className="flex justify-center gap-8 mt-6">
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
                dispatch(clearFormData());
                setTimeout(() => {
                  Object.values(textareasRef.current).forEach((textarea) => {
                    if (textarea) {
                      textarea.style.height = "auto";
                      textarea.style.height = `${textarea.scrollHeight}px`;
                    }
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
