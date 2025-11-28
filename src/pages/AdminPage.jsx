import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  useGetContentsQuery,
  useCreateContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
} from "../Redux/contentApiSlice";
import {useGetUserProfileQuery} from "../Redux/UserApiSlice";
const AdminContentPage = () => {
  // ✅ Local state
  const [selectedContent, setSelectedContent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    words: "",
    category: "Philosophy",
    keywords: [],
    for: [],
  });

  // ✅ Fetch all contents
  const { data, isLoading, refetch } = useGetContentsQuery({ page: 1, limit: 20 });
  const {data:profileData}=useGetUserProfileQuery();
  console.log("Profile Data:", profileData);
  console.log("Admin fetched contents:", data);
  const [createContent] = useCreateContentMutation();
  const [updateContent] = useUpdateContentMutation();
  const [deleteContent] = useDeleteContentMutation();

  const categories = [
    "Philosophy",
    "Wisdom",
    "Mental Health",
    "Self-Improvement",
    "Productivity",
    "Stoicism",
    "Life",
  ];

  const peopleOptions = ["Entrepreneurs", "Students", "Thinkers", "Leaders", "Fitness People"];

  const toggleArrayItem = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((i) => i !== value)
        : [...prev[key], value],
    }));
  };

  const handleEdit = (content) => {
    setSelectedContent(content._id);
    setFormData({
      title: content.title,
      words: content.words,
      category: content.category,
      keywords: content.keywords,
      for: content.for,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      await deleteContent(id);
      refetch();
    }
  };

  const handleSubmit = async () => {
    if (selectedContent) {
      await updateContent({ id: selectedContent, updatedContent: formData });
    } else {
      await createContent(formData);
    }
    setSelectedContent(null);
    setFormData({
      title: "",
      words: "",
      category: "Philosophy",
      keywords: [],
      for: [],
    });
    refetch();
  };

  return (
    <motion.div
      className="min-h-screen bg-base-200 py-10 px-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
    {profileData?.isAdmin ? (
        <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-6">{selectedContent ? "Edit Content" : "Create Content"}</h1>

        {/* TITLE */}
        <div className="mb-4">
          <label className="label font-semibold">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        {/* WORDS */}
        <div className="mb-4">
          <label className="label font-semibold">Words / Description</label>
          <textarea
            className="textarea textarea-bordered w-full h-24"
            value={formData.words}
            onChange={(e) => setFormData({ ...formData, words: e.target.value })}
          ></textarea>
        </div>

        {/* CATEGORY */}
        <div className="mb-4">
          <label className="label font-semibold">Category</label>
          <select
            className="select select-bordered w-full"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* FOR */}
        <div className="mb-4">
          <label className="label font-semibold">Audience</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {peopleOptions.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => toggleArrayItem("for", p)}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  formData.for.includes(p)
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-base-200 border-base-300"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* KEYWORDS */}
        <div className="mb-4">
          <label className="label font-semibold">Keywords (comma separated)</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.keywords.join(", ")}
            onChange={(e) =>
              setFormData({ ...formData, keywords: e.target.value.split(",").map((k) => k.trim()) })
            }
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button className="btn btn-primary w-full mt-4" onClick={handleSubmit}>
          {selectedContent ? "Update Content" : "Create Content"}
        </button>

        {/* CONTENT LIST */}
        <h2 className="text-2xl font-bold mt-10 mb-4">All Contents</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {data?.contents.map((c) => (
              <div
                key={c._id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm text-gray-500">{c.category}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ):(
      <> <h1 className="text-center text-2xl text-red-600 font-bold">Forbidden Access</h1> </>
    )
      }
    </motion.div>
  );
};

export default AdminContentPage;
