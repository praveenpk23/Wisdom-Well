import React, { useState } from "react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  // ✅ Dummy user data
  const [user, setUser] = useState({
    name: "Praveen kumar",
    email: "praveenpk2k3@gmamil.com",
    profession: "Entrepreneur",
    bio: "",
    interests: ["Wisdom", "Self-Improvement", "Philosophy"],
    forPeople: ["Entrepreneurs", "Thinkers"],
  });

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

  const toggleArrayItem = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((i) => i !== value)
        : [...prev[key], value],
    }));
  };

  return (
    <motion.div
      className="min-h-screen bg-base-200 py-10 px-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-xl p-8">

        {/* HEADER */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden border">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* NAME */}
        <div className="mb-6">
          <label className="label font-semibold">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>

        {/* EMAIL */}
        <div className="mb-6">
          <label className="label font-semibold">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        {/* PROFESSION */}
        <div className="mb-6">
          <label className="label font-semibold">Profession</label>
          <select
            className="select select-bordered w-full"
            value={user.profession}
            onChange={(e) => setUser({ ...user, profession: e.target.value })}
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
        <div className="mb-8">
          <label className="label font-semibold">Interests</label>

          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => toggleArrayItem("interests", cat)}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  user.interests.includes(cat)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-base-200 border-base-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FOR PEOPLE */}
        <div className="mb-8">
          <label className="label font-semibold">You relate with</label>

          <div className="flex flex-wrap gap-2 mt-2">
            {peopleOptions.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => toggleArrayItem("forPeople", p)}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  user.forPeople.includes(p)
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-base-200 border-base-300"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* BIO */}
        <div className="mb-6">
          <label className="label font-semibold">Bio (Optional)</label>
          <textarea
            className="textarea textarea-bordered w-full h-28"
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
          ></textarea>
        </div>

        {/* UPDATE BUTTON */}
        <button className="btn btn-primary w-full mt-4">Update Profile</button>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
