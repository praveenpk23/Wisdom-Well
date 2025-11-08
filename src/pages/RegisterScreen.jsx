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

//     const handleSelectAllInterests = () => {
//     if (interests.length === categories.length) {
//       setInterests([]); // unselect all
//     } else {
//       setInterests(categories); // select all
//     }
//   };


//   return (
//     <div className="min-h-screen px-4 flex items-center justify-center bg-base-200">
//       <div className="w-full max-w-3xl bg-base-100 shadow-xl rounded-2xl p-6 md:p-10">

//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-6">
//           Create Your Account
//         </h2>

//         {error && <div className="alert alert-error mb-4">{error}</div>}

//         <form onSubmit={HandleRegister} className="grid gap-6">

//           {/* Name & Email */}
//           <div className="grid md:grid-cols-2 gap-4">
//             <div className="form-control">
//               <label className="label font-medium">Name</label>
//               <input
//                 type="text"
//                 className="input input-bordered w-full"
//                 placeholder="John Doe"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="form-control">
//               <label className="label font-medium">Email</label>
//               <input
//                 type="email"
//                 className="input input-bordered w-full"
//                 placeholder="john@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           {/* Profession */}
//           <div className="form-control">
//             <label className="label font-medium">Profession</label>
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

//           {/* Interests */}
//           <div>
//              <div className="flex items-center justify-between">
//               <label className="label font-semibold">Interests</label>
//               <button
//                 type="button"
//                 onClick={handleSelectAllInterests}
//                 className="btn btn-xs btn-outline mt-10"
//               >
//                 {interests.length === categories.length ? "Unselect All" : "Select All"}
//               </button>
//             </div>           
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {categories.map((cat) => (
//                 <label key={cat} className="flex items-center gap-2 bg-base-200 p-2 rounded-lg cursor-pointer">
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

//           {/* For People */}
//           <div>
//             <label className="label font-semibold">You relate with</label>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {peopleOptions.map((p) => (
//                 <label key={p} className="flex items-center gap-2 bg-base-200 p-2 rounded-lg cursor-pointer">
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

//           {/* Bio */}
//           <div className="form-control">
//             <label className="label font-medium">Short Bio</label>
//             <textarea
//               className="textarea textarea-bordered w-full h-24 resize-none"
//               placeholder="Tell a little about yourself..."
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//             ></textarea>
//           </div>

//           {/* Password Fields */}
//           <div className="grid md:grid-cols-2 gap-4">
//             <div className="form-control">
//               <label className="label font-medium">Password</label>
//               <input
//                 type="password"
//                 className="input input-bordered w-full"
//                 placeholder="********"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="form-control">
//               <label className="label font-medium">Confirm Password</label>
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

//           {/* Button */}
//           <button
//             type="submit"
//             className="btn btn-primary w-full mt-4"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <span className="loading loading-spinner"></span>
//             ) : (
//               "Create Account"
//             )}
//           </button>

//           {/* Login Link */}
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



import React, { useState } from "react";
import { useRegisterMutation } from "../Redux/UserApiSlice";
import { useNavigate, Link } from "react-router-dom";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("Other");
  const [interests, setInterests] = useState([]);
  const [forPeople, setForPeople] = useState([]);
  const [bio, setBio] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

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

  const HandleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await registerUser({
        name,
        email,
        password,
        profession,
        interests,
        forPeople,
        bio,
      }).unwrap();

      navigate("/");
    } catch (err) {
      setError(err?.data?.message || "Registration Failed");
    }
  };

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
      setInterests([]); // unselect all
    } else {
      setInterests(categories); // select all
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-2xl bg-base-100 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {error && <div className="alert alert-error mb-4">{error}</div>}

        <form onSubmit={HandleRegister} className="space-y-6">

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
                {interests.length === categories.length ? "Unselect All" : "Select All"}
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
            ></textarea>
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
              <label className="label font-semibold">Confirm Password</label>
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
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Register"
            )}
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
