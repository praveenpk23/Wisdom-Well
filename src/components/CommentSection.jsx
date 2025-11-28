import React, { useState } from "react";
import { motion } from "framer-motion";

const CommentSection = () => {
  const [comment, setComment] = useState("");

  // Dummy data for UI
  const dummyComments = [
    {
      id: 1,
      name: "Arun Kumar",
      time: "2 hours ago",
      text: "Amazing write-up! The philosophy part hit deep. Keep posting 🔥"
    },
    {
      id: 2,
      name: "Meera",
      time: "1 day ago",
      text: "Loved this explanation. Very well structured and clear 🙌"
    },
    {
      id: 3,
      name: "Dev",
      time: "3 days ago",
      text: "This is actually very helpful. Nice one bro!"
    },
  ];

  const handleAdd = () => {
    if (!comment.trim()) return;
    alert("Comment added (demo only)");
    setComment("");
  };

return (
  <motion.section
    className="mt-16 pt-10 border-t border-gray-200 space-y-8 max-w-3xl mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6 }}
  >
    {/* 🗨️ Title */}
    <h3 className="text-2xl font-bold text-gray-900 mb-4">Comments</h3>

    {/* ✏️ Comment Input */}
    <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
      
      {/* ✅ Initials Avatar */}
      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
        PK
      </div>

      <div className="flex-1">
        <textarea
          className="w-full resize-none rounded-xl border border-gray-300 p-3 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleAdd}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>

    {/* 💬 Comments List */}
    <div className="space-y-6">
      {dummyComments.map((c) => {
        const initials = c.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

        return (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start gap-3">

              {/* ✅ Initials Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
                {initials}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                  <span className="text-xs text-gray-500">{c.time}</span>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                  {c.text}
                </p>

                {/* ❤️ Like + Reply */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="hover:text-blue-600 transition flex items-center gap-1">
                    Like
                  </button>
                  <button className="hover:text-blue-600 transition">Reply</button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.section>
);

};

export default CommentSection;
