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

 // ✅ Manual load more
  const loadMore = () => {
    if (!isFetching && hasMore) setPage((p) => p + 1);
  };

  // ✅ Infinite scroll
  const handleScroll = useCallback(() => {
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 50;

    if (atBottom && !isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

return (
  <div className="min-h-screen bg-base-100 text-base-content transition-all duration-300">

    <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">

      {/* PAGE HEADER */}
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold">
          Discover Insights
        </h1>
        <p className="opacity-70 text-sm mt-1">
          Curated wisdom • Mental frameworks • Life philosophy
        </p>
      </div>

      {/* CONTENT LIST */}
      <div className="space-y-8">
        {contents.map((content) => (
          <div
            key={content._id}
            className="
              border-b border-base-300
              pb-6 group transition-all
            "
          >
            {/* Category */}
            <span className="
              text-xs font-semibold uppercase tracking-wide
              text-primary
            ">
              {content.category}
            </span>

            {/* Title */}
            <Link to={`/content/${content._id}`}>
              <h2 className="
                mt-1 text-2xl font-bold
                group-hover:text-primary
                transition-colors cursor-pointer
              ">
                {content.title}
              </h2>
            </Link>

            {/* Summary */}
            <p className="
              mt-2 opacity-80 text-[15px]
              leading-relaxed line-clamp-2
            ">
              {content.words}
            </p>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between mt-4">

              {/* Date */}
              <span className="text-xs opacity-60">
                {new Date(content.createdAt).toLocaleDateString()}
              </span>

              {/* Like Button */}
              <LikeButton contentId={content._id} size="sm" />
            </div>
          </div>
        ))}
      </div>

      {/* LOADING */}
      {isFetching && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* LOAD MORE */}
      {hasMore && !isFetching && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="
              px-5 py-2.5 
              text-sm font-semibold 
              bg-primary text-primary-content
              rounded-full shadow-sm
              hover:scale-105 active:scale-95
              transition-all
            "
          >
            Load More
          </button>
        </div>
      )}

      {/* END MESSAGE */}
      {!hasMore && (
        <p className="text-center opacity-50 text-sm">
          • No more content •
        </p>
      )}
    </div>
  </div>
);


};

export default Home;
