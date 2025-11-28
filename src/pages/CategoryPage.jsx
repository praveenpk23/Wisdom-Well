import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetContentsByCategoryQuery } from "../Redux/contentApiSlice";
import FilterBar from "../components/FilterBar";
import LikeButton from "../components/LikeButton";

const CategoryPage = () => {
  const { cg } = useParams();

  const [page, setPage] = useState(1);
  const [contents, setContents] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // ✅ Fetch content by CATEGORY
  const { data, isFetching } = useGetContentsByCategoryQuery({
    category: cg,
    page,
    limit: 10,
  });

  // ✅ Reset when category changes
  useEffect(() => {
    setPage(1);
    setContents([]);
    setHasMore(true);
  }, [cg]);

  // ✅ Append new paginated results
  useEffect(() => {
    if (data?.contents) {
      setContents((prev) =>
        page === 1 ? data.contents : [...prev, ...data.contents]
      );

      if (data.contents.length < 10) setHasMore(false);
    }
  }, [data, page]);

  // ✅ Manual Load More
  const loadMore = () => {
    if (!isFetching && hasMore) setPage((p) => p + 1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 px-4 py-10">

      <div className="max-w-3xl mx-auto space-y-10">

        {/* ✅ FILTER BAR */}
        <FilterBar mode="category" />

        {/* ✅ HEADING */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4">
          {cg} Articles
        </h1>

        {/* ✅ CONTENT LIST */}
        <div className="space-y-8">
          {contents.map((content) => (
            <div
              key={content._id}
              className="border-b border-gray-200 dark:border-neutral-700 pb-6"
            >
              <span className="text-xs text-blue-600 dark:text-blue-300 font-semibold uppercase tracking-wide">
                {content.category}
              </span>

              <Link to={`/content/${content._id}`}>
                <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100 hover:underline">
                  {content.title}
                </h2>
              </Link>

              <p className="mt-2 text-gray-600 dark:text-gray-300 text-[15px] line-clamp-2">
                {content.words}
              </p>

              <div className="flex justify-between mt-4">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(content.createdAt).toLocaleDateString()}
                </span>
                <LikeButton contentId={content._id} size="sm" />
              </div>
            </div>
          ))}
        </div>

        {/* ✅ LOADING */}
        {isFetching && (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {/* ✅ LOAD MORE */}
        {hasMore && !isFetching && (
          <div className="flex justify-center">
            <button
              onClick={loadMore}
              className="
                px-5 py-2 
                bg-gray-900 dark:bg-gray-100 
                text-white dark:text-gray-900
                rounded-full text-sm 
                hover:scale-105 transition
              "
            >
              Load More
            </button>
          </div>
        )}

        {/* ✅ END */}
        {!hasMore && (
          <p className="text-center text-gray-400 dark:text-gray-500 text-sm">
            • End of results •
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
