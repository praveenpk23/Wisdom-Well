// import React from "react";
// import { useParams } from "react-router-dom";
// import { useGetContentByIdQuery } from "../Redux/contentApiSlice";

// const PostDetails = () => {
//   const { id } = useParams();
//   const { data: post, isLoading, isError, error } = useGetContentByIdQuery(id);

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );

//   if (isError)
//     return (
//       <div className="alert alert-error shadow-lg max-w-lg mx-auto mt-10">
//         <span>{error?.data?.message || "Error fetching post"}</span>
//       </div>
//     );

//   if (!post)
//     return (
//       <div className="text-center text-gray-500 mt-10">
//         No content found
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       <article className="max-w-3xl mx-auto px-4 py-10">

//         {/* TITLE */}
//         <h1 className="text-4xl font-bold leading-tight mb-4">
//           {post.title}
//         </h1>

//         {/* META INFO */}
//         <p className="text-sm text-gray-500 mb-10">
//           {new Date(post.createdAt).toLocaleDateString()} • {post.category}
//         </p>

//         {/* BODY */}
//         <section className="prose prose-lg max-w-none mb-12">
//           <p className="whitespace-pre-wrap text-lg leading-relaxed">
//             {post.words}
//           </p>
//         </section>

//         {/* REFERENCE SECTIONS */}
//         <section className="space-y-10">

//           {/* BOOKS */}
//           {post.ref?.book?.length > 0 && (
//             <div>
//               <h2 className="text-2xl font-semibold mb-4">📚 Book References</h2>
//               <ul className="space-y-4">
//                 {post.ref.book.map((b, idx) => (
//                   <li
//                     key={idx}
//                     className="p-4 border border-gray-200 rounded-xl hover:shadow transition"
//                   >
//                     <p className="font-semibold">{b.title}</p>
//                     <p className="text-sm text-gray-500">{b.author}</p>
//                     <a
//                       href={b.link}
//                       target="_blank"
//                       className="text-blue-600 underline"
//                     >
//                       {b.link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* YOUTUBE */}
//           {post.ref?.Ytube?.length > 0 && (
//             <div>
//               <h2 className="text-2xl font-semibold mb-4">🎬 YouTube References</h2>
//               <ul className="space-y-4">
//                 {post.ref.Ytube.map((y, idx) => (
//                   <li
//                     key={idx}
//                     className="p-4 border border-gray-200 rounded-xl hover:shadow transition"
//                   >
//                     <p className="font-semibold">{y.title}</p>
//                     <p className="text-sm text-gray-500">{y.channel}</p>
//                     <a
//                       href={y.link}
//                       target="_blank"
//                       className="text-blue-600 underline"
//                     >
//                       {y.link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* PODCAST */}
//           {post.ref?.podcast?.length > 0 && (
//             <div>
//               <h2 className="text-2xl font-semibold mb-4">🎧 Podcast References</h2>
//               <ul className="space-y-4">
//                 {post.ref.podcast.map((p, idx) => (
//                   <li
//                     key={idx}
//                     className="p-4 border border-gray-200 rounded-xl hover:shadow transition"
//                   >
//                     <p className="font-semibold">{p.title}</p>
//                     <p className="text-sm text-gray-500">{p.host}</p>
//                     <a
//                       href={p.link}
//                       target="_blank"
//                       className="text-blue-600 underline"
//                     >
//                       {p.link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* ARTICLES */}
//           {post.ref?.article?.length > 0 && (
//             <div>
//               <h2 className="text-2xl font-semibold mb-4">📰 Article References</h2>
//               <ul className="space-y-4">
//                 {post.ref.article.map((a, idx) => (
//                   <li
//                     key={idx}
//                     className="p-4 border border-gray-200 rounded-xl hover:shadow transition"
//                   >
//                     <p className="font-semibold">{a.title}</p>
//                     <p className="text-sm text-gray-500">{a.site}</p>
//                     <a
//                       href={a.link}
//                       target="_blank"
//                       className="text-blue-600 underline"
//                     >
//                       {a.link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//         </section>
//       </article>
//     </div>
//   );
// };

// export default PostDetails;


import React from "react";
import { useParams } from "react-router-dom";
import { useGetContentByIdQuery } from "../Redux/contentApiSlice";
import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaTwitter, FaLinkedin, FaCopy } from "react-icons/fa";
import LikeButton from "../components/LikeButton";
const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isLoading, isError, error } = useGetContentByIdQuery(id);

  const url = window.location.href; // ✅ Page share URL

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <div className="alert alert-error shadow-lg max-w-lg mx-auto mt-10">
        <span>{error?.data?.message || "Error fetching content"}</span>
      </div>
    );

  if (!post)
    return (
      <div className="text-center text-gray-500 mt-10">
        No content found
      </div>
    );

  // ✅ SHARE FUNCTIONS
  const shareOptions = [
    {
      label: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(url)}`,
    },
    {
      label: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
      label: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}`,
    },
    {
      label: "Instagram",
      url: `https://www.instagram.com/?url=${encodeURIComponent(url)}`, // IG doesn't support deep share — sends URL
    },
  ];

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
    alert("Link copied ✅");
  };

  return (
    <motion.div
      className="min-h-screen bg-white text-gray-900"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <article className="max-w-3xl mx-auto px-4 py-10">

        {/* TITLE */}
        <motion.h1
          className="text-4xl font-bold leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {post.title}
        </motion.h1>

        {/* META */}
        <motion.p
          className="text-sm text-gray-500 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {new Date(post.createdAt).toLocaleDateString()} • {post.category}
        </motion.p>

        {/* BODY */}
        <motion.section
          className="prose prose-lg max-w-none mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <p className="whitespace-pre-wrap text-lg leading-relaxed">
            {post.words}
          </p>
        </motion.section>

        {/* REFERENCES SECTION */}
        <motion.section
          className="space-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >

          {/* BOOK REFS */}
          {post.ref?.book?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">📚 Book References</h2>
              <ul className="space-y-4">
                {post.ref.book.map((b, idx) => (
                  <motion.li
                    key={idx}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-semibold">{b.title}</p>
                    <p className="text-sm text-gray-500">{b.author}</p>
                    <a href={b.link} className="text-blue-600 underline break-all">
                      {b.link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* YOUTUBE */}
          {post.ref?.Ytube?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">🎬 YouTube References</h2>
              <ul className="space-y-4">
                {post.ref.Ytube.map((y, idx) => (
                  <motion.li
                    key={idx}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-semibold">{y.title}</p>
                    <p className="text-sm text-gray-500">{y.channel}</p>
                    <a href={y.link} className="text-blue-600 underline break-all">
                      {y.link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* PODCAST */}
          {post.ref?.podcast?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">🎧 Podcast References</h2>
              <ul className="space-y-4">
                {post.ref.podcast.map((p, idx) => (
                  <motion.li
                    key={idx}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm text-gray-500">{p.host}</p>
                    <a href={p.link} className="text-blue-600 underline break-all">
                      {p.link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* ARTICLES */}
          {post.ref?.article?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">📰 Article References</h2>
              <ul className="space-y-4">
                {post.ref.article.map((a, idx) => (
                  <motion.li
                    key={idx}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-semibold">{a.title}</p>
                    <p className="text-sm text-gray-500">{a.site}</p>
                    <a href={a.link} className="text-blue-600 underline break-all">
                      {a.link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.section>
        {/* BOTTOM: LIKE + SHARE */}
<motion.section
  className="border-t border-gray-200 mt-16 pt-8 pb-10 flex flex-col gap-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4 }}
>
  {/* LIKE BUTTON */}
  <div>
    <LikeButton postId={post._id} />
  </div>

  {/* SHARE SECTION */}
  <div>
    <h3 className="text-xl font-semibold mb-3">Share</h3>

    <div className="flex items-center gap-4 text-2xl">

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 hover:scale-110 transition"
      >
        <FaWhatsapp />
      </a>

      {/* Instagram */}
      <a
        href={`https://www.instagram.com/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-600 hover:scale-110 transition"
      >
        <FaInstagram />
      </a>

      {/* Twitter/X */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:scale-110 transition"
      >
        <FaTwitter />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:scale-110 transition"
      >
        <FaLinkedin />
      </a>

      {/* Copy Link */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          alert("Link copied ✅");
        }}
        className="text-gray-700 hover:scale-110 transition"
      >
        <FaCopy />
      </button>
    </div>
  </div>
</motion.section>

      </article>
    </motion.div>
  );
};

export default PostDetails;
