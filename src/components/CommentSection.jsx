import React from "react";
import { motion } from "framer-motion";
import { FaComments, FaClock } from "react-icons/fa";

const CommentSection = () => {
  return (
    <motion.section
      className="mt-16 pt-12 border-t border-gray-200 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center space-y-4">
        
        {/* Icon */}
        <div className="mx-auto w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
          <FaComments className="w-6 h-6" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900">
          Comments Coming Soon
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
          We’re working on a clean and meaningful comment system where you can
          share thoughts, reply to others, and engage deeply with posts.
        </p>

        {/* Status */}
        <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
          <FaClock className="w-4 h-4" />
          Feature under development
        </div>
      </div>
    </motion.section>
  );
};

export default CommentSection;
