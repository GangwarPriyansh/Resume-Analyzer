import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faLink,
  faCamera,
  faTrash,
  faSave,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../slice/userSlice";
import { updateProfile, uploadPhoto } from "../services/profileAPI";
import { toast } from "react-toastify";

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    contact: user?.number || "",
    email: user?.email || "",
    linkedin: user?.linkedin || "",
    github: user?.github || "",
  });
  const [profilePhoto, setProfilePhoto] = useState(user?.photoUrl || null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setProfilePhoto(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First upload photo if changed
      let photoUrl = profilePhoto;
      if (fileInputRef.current?.files[0]) {
        const uploadResponse = await uploadPhoto(
          fileInputRef.current.files[0],
          token
        );
        photoUrl = uploadResponse.photoUrl;
      }

      // Then update profile
      const updatedUser = await updateProfile(
        {
          name: profileData.name,
          email: profileData.email,
          number: profileData.contact,
          linkedin: profileData.linkedin,
          github: profileData.github,
          photoUrl,
        },
        token
      );

      dispatch(updateUserProfile(updatedUser));
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a202c] to-[#2d3748] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
            Profile Settings
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Update your personal information and profile photo
          </p>
        </div>

        <div className="bg-[#212e41] rounded-2xl shadow-xl overflow-hidden border border-[#334155]">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Photo Upload Section */}
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-40 h-40 rounded-full bg-[#2d3748] border-2 border-[#3a4556] overflow-hidden flex items-center justify-center">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-5xl">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                    )}
                  </div>
                  {profilePhoto && (
                    <button
                      onClick={handleRemovePhoto}
                      className="absolute -top-4 -right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
                      title="Remove photo"
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                  )}
                </div>

                <label
                  htmlFor="profilePhoto"
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${
                    profilePhoto
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-[#3a4556] hover:bg-[#4a5568]"
                  } text-white transition`}
                >
                  <FontAwesomeIcon icon={faCamera} />
                  {profilePhoto ? "Change Photo" : "Upload Photo"}
                </label>
                <input
                  type="file"
                  id="profilePhoto"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <p className="text-gray-400 text-sm mt-2">
                  JPG or PNG, max 2MB
                </p>
              </div>

              {/* Profile Form Section */}
              <div className="md:w-2/3">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      {
                        field: "name",
                        label: "Full Name",
                        icon: faUser,
                      },
                      {
                        field: "contact",
                        label: "Contact Number",
                        icon: faPhone,
                      },
                      {
                        field: "email",
                        label: "Email",
                        icon: faEnvelope,
                      },
                      {
                        field: "linkedin",
                        label: "LinkedIn URL",
                        icon: faLink,
                        required: false,
                      },
                      {
                        field: "github",
                        label: "GitHub URL",
                        icon: faLink,
                        required: false,
                      },
                    ].map(({ field, label, icon, required }) => (
                      <div key={field} className="group">
                        <div className="flex items-center mb-2">
                          <FontAwesomeIcon
                            icon={icon}
                            className="text-blue-400 mr-2"
                          />
                          <label
                            htmlFor={field}
                            className="text-gray-300 font-medium group-hover:text-white transition-colors"
                          >
                            {label}
                            {required && (
                              <span className="text-red-400 ml-1">*</span>
                            )}
                          </label>
                        </div>
                        <input
                          type={field === "email" ? "email" : "text"}
                          id={field}
                          name={field}
                          value={profileData[field] || ""}
                          onChange={handleChange}
                          className="w-full bg-[#2d3748] text-white border border-[#3a4556] px-4 py-3 rounded-lg
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                     hover:border-blue-400 transition-all"
                          required={required}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg
                      hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5
                      shadow-lg ${
                        isLoading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <FontAwesomeIcon
                            icon={faSpinner}
                            className="animate-spin"
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faSave} />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
