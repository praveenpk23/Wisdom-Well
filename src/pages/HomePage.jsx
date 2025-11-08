import React, { useState, useEffect, useCallback } from "react";
import { useGetContentsQuery } from "../Redux/contentApiSlice";
import { Link } from "react-router-dom";
import LikeButton from "../components/LikeButton";

const Home = () => {
  const [page, setPage] = useState(1);
  const [contents, setContents] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // ✅ Fetch paginated content
  const { data, isFetching } = useGetContentsQuery({
    page,
    limit: 10,
  });

  console.log("Fetched contents:", data);
  
  // ✅ Append paginated results
  useEffect(() => {
    if (data?.contents) {
      setContents((prev) => {
        const combined = page === 1 ? data.contents : [...prev, ...data.contents];
        const unique = Array.from(new Map(combined.map(c => [c._id, c])).values());
        return unique;
      });

      if (data.contents.length < 10) {
        setHasMore(false);
      }
    }
  }, [data, page]);

  // ✅ Infinite scroll handler
  const handleScroll = useCallback(() => {
    const atBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

    if (atBottom && !isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950 p-4">

      <div className="max-w-2xl mx-auto space-y-5">

        {contents.map((content) => (
          <div
            key={content._id}
            className="
              bg-white dark:bg-neutral-800 
              p-5 rounded-2xl border border-gray-200 dark:border-neutral-700
              shadow-sm hover:shadow-md
              transition-all duration-200
            "
          >
            {/* Category Pill */}
            <span
              className="
                px-3 py-1 text-xs rounded-full 
                bg-blue-100 text-blue-700
                dark:bg-blue-900 dark:text-blue-200
              "
            >
              {content.category}
            </span>

            {/* Title */}
            <Link to={`/content/${content._id}`}>
              <h2 className="text-xl font-semibold mt-3 leading-tight hover:underline">
                {content.title}
              </h2>
            </Link>

            {/* Words */}
            <p className="text-gray-700 dark:text-gray-300 mt-3 text-sm leading-relaxed">
              {content.words}
            </p>

            {/* Bottom bar */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs opacity-60">
                {new Date(content.createdAt).toLocaleDateString()}
              </span>

              <LikeButton contentId={content._id} size="sm" />
              {content._id}
            </div>
          </div>
        ))}
      </div>

      {/* Loading Spinner */}
      {isFetching && (
        <div className="flex justify-center my-6">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* No more */}
      {!hasMore && (
        <div className="text-center text-gray-500 my-4">
          No more content to load.
        </div>
      )}
    </div>
  );
};

export default Home;
