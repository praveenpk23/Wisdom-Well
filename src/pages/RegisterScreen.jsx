// import React, { useState } from "react";
// import { useRegisterMutation } from "../Redux/UserApiSlice";
// import { useNavigate, Link } from "react-router-dom";

// const RegisterScreen = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [profession, setProfession] = useState("Other");
//   const [interests, setInterests] = useState([]);
//   const [forPeople, setForPeople] = useState([]);
//   const [bio, setBio] = useState("");

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();
//   const [registerUser, { isLoading }] = useRegisterMutation();

//   const categories = [
//     "Philosophy",
//     "Wisdom",
//     "Mental Health",
//     "Self-Improvement",
//     "Productivity",
//     "Stoicism",
//     "Life",
//   ];

//   const peopleOptions = [
//     "Entrepreneurs",
//     "Students",
//     "Thinkers",
//     "Leaders",
//     "Fitness People",
//   ];

//   const HandleRegister = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     try {
//       await registerUser({
//         name,
//         email,
//         password,
//         profession,
//         interests,
//         forPeople,
//         bio,
//       }).unwrap();

//       navigate("/");
//     } catch (err) {
//       setError(err?.data?.message || "Registration Failed");
//     }
//   };

//   const toggleInterest = (value) => {
//     setInterests((prev) =>
//       prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
//     );
//   };

//   const toggleForPeople = (value) => {
//     setForPeople((prev) =>
//       prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
//     );
//   };

//   const handleSelectAllInterests = () => {
//     if (interests.length === categories.length) {
//       setInterests([]); // unselect all
//     } else {
//       setInterests(categories); // select all
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
//       <div className="w-full max-w-2xl bg-base-100 shadow-xl rounded-xl p-8">
//         <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

//         {error && <div className="alert alert-error mb-4">{error}</div>}

//         <form onSubmit={HandleRegister} className="space-y-6">

//           {/* NAME */}
//           <div>
//             <label className="label font-semibold">Name</label>
//             <input
//               type="text"
//               className="input input-bordered w-full"
//               placeholder="Your full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           {/* EMAIL */}
//           <div>
//             <label className="label font-semibold">Email</label>
//             <input
//               type="email"
//               className="input input-bordered w-full"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/* PROFESSION */}
//           <div>
//             <label className="label font-semibold">Profession</label>
//             <select
//               className="select select-bordered w-full"
//               value={profession}
//               onChange={(e) => setProfession(e.target.value)}
//             >
//               <option>Entrepreneur</option>
//               <option>Student</option>
//               <option>Developer</option>
//               <option>Artist</option>
//               <option>Thinker</option>
//               <option>Fitness</option>
//               <option>Creator</option>
//               <option>Other</option>
//             </select>
//           </div>

//           {/* INTERESTS */}
//           <div>
//             <div className="flex items-center justify-between">
//               <label className="label font-semibold">Interests</label>
//               <button
//                 type="button"
//                 onClick={handleSelectAllInterests}
//                 className="btn btn-xs btn-outline"
//               >
//                 {interests.length === categories.length ? "Unselect All" : "Select All"}
//               </button>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
//               {categories.map((cat) => (
//                 <label
//                   key={cat}
//                   className="flex items-center gap-2 p-2 rounded-lg border border-base-300 hover:bg-base-200 cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     className="checkbox checkbox-sm"
//                     checked={interests.includes(cat)}
//                     onChange={() => toggleInterest(cat)}
//                   />
//                   <span className="text-sm">{cat}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* FOR PEOPLE */}
//           <div>
//             <label className="label font-semibold">You relate with</label>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//               {peopleOptions.map((p) => (
//                 <label
//                   key={p}
//                   className="flex items-center gap-2 p-2 rounded-lg border border-base-300 hover:bg-base-200 cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     className="checkbox checkbox-sm"
//                     checked={forPeople.includes(p)}
//                     onChange={() => toggleForPeople(p)}
//                   />
//                   <span className="text-sm">{p}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* BIO */}
//           <div>
//             <label className="label font-semibold">Short Bio</label>
//             <textarea
//               className="textarea textarea-bordered w-full h-24"
//               placeholder="Tell a little about yourself..."
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//             ></textarea>
//           </div>

//           {/* PASSWORD */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="label font-semibold">Password</label>
//               <input
//                 type="password"
//                 className="input input-bordered w-full"
//                 placeholder="********"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="label font-semibold">Confirm Password</label>
//               <input
//                 type="password"
//                 className="input input-bordered w-full"
//                 placeholder="********"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           {/* SUBMIT */}
//           <button
//             type="submit"
//             className="btn btn-primary w-full mt-4"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <span className="loading loading-spinner"></span>
//             ) : (
//               "Register"
//             )}
//           </button>

//           <p className="text-center mt-4">
//             Already have an account?{" "}
//             <Link to="/login" className="link link-primary">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterScreen;

import React, { use, useEffect, useState } from "react";
import {
  useRegisterStep1Mutation,
  useRegisterVerifyMutation,
  useCheckUsernameQuery
} from "../Redux/UserApiSlice";
import { useNavigate, Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
const RegisterScreen = () => {
  const navigate = useNavigate();

  // -------- STATES --------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profession, setProfession] = useState("Other");
  const [interests, setInterests] = useState([]);
  const [forPeople, setForPeople] = useState([]);
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  // -------- RTK MUTATIONS --------
  const [registerStep1, { isLoading: loadingStep1 }] =
    useRegisterStep1Mutation();
  const [registerVerify, { isLoading: loadingVerify }] =
    useRegisterVerifyMutation();

//   const {
//   data: usernameData,
//   isFetching: checkingUsername,
// } = useCheckUsernameQuery(username, {
//   skip: !username,
// });

const debouncedUsername = useDebounce(username, 500);

const { data: usernameData, isFetching:checkingUsername } = useCheckUsernameQuery(debouncedUsername, {
  skip: !debouncedUsername,
});

const isUsernameAvailable = usernameData?.available;

  // -------- OPTIONS --------
  const categories = [
    "Philosophy",
    "Wisdom",
    "Mental Health",
    "Self-Improvement",
    "Productivity",
    "Stoicism",
    "Life",
  ];

  const peopleOptions = [
    "Entrepreneurs",
    "Students",
    "Thinkers",
    "Leaders",
    "Fitness People",
  ];

  // -------- HANDLERS --------
  const toggleInterest = (value) => {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const toggleForPeople = (value) => {
    setForPeople((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleSelectAllInterests = () => {
    if (interests.length === categories.length) {
      setInterests([]);
    } else {
      setInterests(categories);
    }
  };

  // -------- STEP 1: SEND OTP --------
  const HandleRegisterStep1 = async (e) => {
    e.preventDefault();

    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await registerStep1({
        name,
        email,
        password,
        profession,
        interests,
        forPeople,
        username,
        bio,
      }).unwrap();

      setOtpSent(true);
      console.log("OTP Response:", response);
      if (response.code == "1") {
        setMessage(
          "Your last OTP is still valid. Please check your email & enter latest code."
        );
      }
    } catch (err) {
      setError(err?.data?.message || "Failed to send OTP");
    }
  };

  // -------- STEP 2: VERIFY OTP --------
  const HandleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await registerVerify({
        email,
        otp,
      }).unwrap();

      navigate("/"); // redirect after successful registration
    } catch (err) {
      setError(err?.data?.message || "Invalid OTP");
    }
  };

useEffect(() => {
  if (message) {
    const timer = setTimeout(() => setMessage(""), 10000);
    return () => clearTimeout(timer);
  }
}, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-2xl bg-base-100 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          {otpSent ? "Verify OTP" : "Create Account"}
        </h2>

        {error && <div className="alert alert-error mb-4">{error}</div>}

        <form
          onSubmit={otpSent ? HandleVerifyOtp : HandleRegisterStep1}
          className="space-y-6"
        >
          {!otpSent ? (
            <>
              {/* NAME */}
              <div>
                <label className="label font-semibold">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

                {/* USERNAME */}
              <div>
                <label className="label font-semibold">Username</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Type"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
          {username && checkingUsername && (
  <p className="text-sm text-gray-500 mt-1">Checking username...</p>
)}

{username && !checkingUsername && isUsernameAvailable === false && (
  <p className="text-red-500 text-sm mt-1">
    Username is already taken.
  </p>
)}

{username && !checkingUsername && isUsernameAvailable === true && (
  <p className="text-green-500 text-sm mt-1">
    Username is available.
  </p>
)}

              {/* EMAIL */}
              <div>
                <label className="label font-semibold">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* PROFESSION */}
              <div>
                <label className="label font-semibold">Profession</label>
                <select
                  className="select select-bordered w-full"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                >
                  <option>Entrepreneur</option>
                  <option>Student</option>
                  <option>Developer</option>
                  <option>Artist</option>
                  <option>Thinker</option>
                  <option>Fitness</option>
                  <option>Creator</option>
                  <option>Other</option>
                </select>
              </div>

              {/* INTERESTS */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="label font-semibold">Interests</label>
                  <button
                    type="button"
                    onClick={handleSelectAllInterests}
                    className="btn btn-xs btn-outline"
                  >
                    {interests.length === categories.length
                      ? "Unselect All"
                      : "Select All"}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 p-2 rounded-lg border border-base-300 hover:bg-base-200 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={interests.includes(cat)}
                        onChange={() => toggleInterest(cat)}
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* FOR PEOPLE */}
              <div>
                <label className="label font-semibold">You relate with</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {peopleOptions.map((p) => (
                    <label
                      key={p}
                      className="flex items-center gap-2 p-2 rounded-lg border border-base-300 hover:bg-base-200 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={forPeople.includes(p)}
                        onChange={() => toggleForPeople(p)}
                      />
                      <span className="text-sm">{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* BIO */}
              <div>
                <label className="label font-semibold">Short Bio</label>
                <textarea
                  className="textarea textarea-bordered w-full h-24"
                  placeholder="Tell a little about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label font-semibold">Password</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label font-semibold">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={loadingStep1 || isUsernameAvailable === false}              >
                {loadingStep1 ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Send OTP"
                )}
              </button>
            </>
          ) : (
            <>
              {/* OTP INPUT */}

              <p className="text-center text-sm">
                OTP sent to <b>{email}</b>
              </p>
             
                
                {message && (
                  <p className="text-center text-sm text-green-500 mt-2">
                    {message}
                  </p>)}
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={loadingVerify}
              >
                {loadingVerify ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Verify & Create Account"
                )}
              </button>

              <button 
                type="button"
                className="btn btn-secondary w-1/3 mt-4"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                  setMessage("");
                }}
              >
                 Back to Registration
              </button>
            </>
          )}
        </form>

        {!otpSent && (
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterScreen;
