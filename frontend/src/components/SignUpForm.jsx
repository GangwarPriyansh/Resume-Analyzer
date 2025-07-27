// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { setUser } from "../slice/userSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// export default function SignUpForm() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     number: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     try {
//       const res = await fetch(
//         "https://resume-analyzer-6lys.onrender.com/api/users/signup",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await res.json();

//       if (res.ok) {
//         const userPayload = {
//           user: {
//             name: data.user.name,
//             email: data.user.email,
//             number: data.user.number,
//           },
//           token: data.token,
//           isAuthenticated: true,
//         };

//         localStorage.setItem("user", JSON.stringify(userPayload));

//         // Dispatch to Redux
//         dispatch(setUser(userPayload));

//         toast.success("Account created successfully!");
//         navigate("/");
//       } else {
//         toast.error(data.message || "Signup failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Signup failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#313946] flex justify-center items-center px-4">
//       <div className="bg-[#1c2331] p-8 rounded-lg shadow-2xl w-full max-w-md text-white">
//         <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
//           Sign Up
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block mb-1 text-gray-300">
//               Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 rounded bg-[#2b313c] border border-gray-600 text-white"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block mb-1 text-gray-300">
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 rounded bg-[#2b313c] border border-gray-600 text-white"
//             />
//           </div>

//           <div>
//             <label htmlFor="number" className="block mb-1 text-gray-300">
//               Number
//             </label>
//             <input
//               id="number"
//               name="number"
//               value={formData.number}
//               onChange={handleChange}
//               required
//               pattern="[0-9]{10,15}"
//               title="Please enter a valid phone number"
//               className="w-full px-4 py-2 rounded bg-[#2b313c] border border-gray-600 text-white"
//             />
//           </div>

//           <div className="relative">
//             <label htmlFor="password" className="block mb-1 text-gray-300">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 rounded bg-[#2b313c] border border-gray-600 text-white"
//             />
//             <FontAwesomeIcon
//               icon={showPassword ? faEyeSlash : faEye}
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-[50%] translate-y-[40%] text-gray-400 hover:text-gray-300 cursor-pointer"
//             />
//           </div>

//           <div className="relative">
//             <label
//               htmlFor="confirmPassword"
//               className="block mb-1 text-gray-300"
//             >
//               Confirm Password
//             </label>
//             <input
//               id="confirmPassword"
//               name="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 rounded bg-[#2b313c] border border-gray-600 text-white"
//             />
//             <FontAwesomeIcon
//               icon={showConfirmPassword ? faEyeSlash : faEye}
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-[50%] translate-y-[40%] text-gray-400 hover:text-gray-300 cursor-pointer"
//             />
//           </div>

//           <p className="text-sm text-gray-400 text-center">
//             Already have an account?{" "}
//             <button
//               type="button"
//               onClick={() => navigate("/login")}
//               className="text-blue-400 hover:underline"
//             >
//               Login
//             </button>
//           </p>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-4 transition transform hover:-translate-y-1 hover:shadow-lg"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../slice/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faUserPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(
        "https://resume-analyzer-6lys.onrender.com/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        const userPayload = {
          user: {
            name: data.user.name,
            email: data.user.email,
            number: data.user.number,
          },
          token: data.token,
          isAuthenticated: true,
        };

        localStorage.setItem("user", JSON.stringify(userPayload));
        dispatch(setUser(userPayload));

        toast.success("Account created successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a202c] to-[#2d3748] pt-16 pb-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-3 flex items-center justify-center">
            Join ResumeBuddy
            <span className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center ml-3">
              <FontAwesomeIcon
                icon={faUserPlus}
                className="text-white text-lg"
              />
            </span>
          </h1>
          <p className="text-gray-300">
            Create your account and start building professional resumes in
            minutes
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#1c2331] p-6 rounded-xl shadow-2xl border border-[#2d3748]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="group">
              <label className="text-gray-300 mb-1 flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-400" />
                Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-[#2b313c] border border-[#3a4556] text-white 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          hover:border-blue-400 transition-all"
              />
            </div>

            <div className="group">
              <label className="text-gray-300 mb-1 flex items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mr-2 text-blue-400"
                />
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-[#2b313c] border border-[#3a4556] text-white 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          hover:border-blue-400 transition-all"
              />
            </div>

            <div className="group">
              <label className="text-gray-300 mb-1 flex items-center">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mr-2 text-blue-400"
                />
                Phone Number
              </label>
              <input
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                pattern="[0-9]{10,15}"
                title="Please enter a valid phone number"
                className="w-full px-4 py-2 rounded-lg bg-[#2b313c] border border-[#3a4556] text-white 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          hover:border-blue-400 transition-all"
              />
            </div>

            <div className="group relative">
              <label className="text-gray-300 mb-1 flex items-center">
                <FontAwesomeIcon icon={faLock} className="mr-2 text-blue-400" />
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pr-10 rounded-lg bg-[#2b313c] border border-[#3a4556] text-white 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          hover:border-blue-400 transition-all"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[50%] translate-y-[40%] text-gray-400 hover:text-gray-300 cursor-pointer"
              />
            </div>

            <div className="group relative">
              <label className="text-gray-300 mb-1 flex items-center">
                <FontAwesomeIcon icon={faLock} className="mr-2 text-blue-400" />
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pr-10 rounded-lg bg-[#2b313c] border border-[#3a4556] text-white 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          hover:border-blue-400 transition-all"
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[50%] translate-y-[40%] text-gray-400 hover:text-gray-300 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg mt-4
                        transition transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              Create Account
            </button>

            <div className="text-center text-gray-400 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center gap-1 mx-auto"
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
