import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  useSearchContentsQuery,
  useLazyGetSuggestionsQuery,
} from "../Redux/contentApiSlice";
import LikeButton from "../components/LikeButton";

const LIMIT = 10;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || ""; // Actual search query

  const [input, setInput] = useState(q); // Input field
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const wrapperRef = useRef(null);

  // 🔍 Fetch results based on q
  const { data, isFetching } = useSearchContentsQuery(
    { q, page, limit: LIMIT },
    { skip: !q }
  );

  const [triggerSuggestions, { data: suggestions }] =
    useLazyGetSuggestionsQuery();

  // ➕ Reset results when q changes
  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
  }, [q]);

  // ➕ Append results for pagination
  useEffect(() => {
    if (data?.contents) {
      setResults((prev) => {
        const combined = page === 1 ? data.contents : [...prev, ...data.contents];
        return Array.from(new Map(combined.map((c) => [c._id, c])).values());
      });

      if (data.contents.length < LIMIT || page >= data.pages) setHasMore(false);
    }
  }, [data, page]);

  // 🔮 Suggestions (debounced)
  useEffect(() => {
    if (input.length >= 2) {
      const timer = setTimeout(() => {
        triggerSuggestions(input);
        setShowSuggestions(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowSuggestions(false);
    }
  }, [input, triggerSuggestions]);

  // 🔍 Submit search (triggered by Enter or click)
  const submitSearch = (value) => {
    setSearchParams({ q: value });
    setInput(value); // Keep input synced
    setShowSuggestions(false);
  };

  // ♾ Infinite scroll
  const handleScroll = useCallback(() => {
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 80;

    if (atBottom && !isFetching && hasMore) {
      setPage((p) => p + 1);
    }
  }, [isFetching, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 📌 Hide suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-extrabold">Search</h1>
          <p className="opacity-70 text-sm mt-1">
            Explore ideas, mindset & philosophy
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative" ref={wrapperRef}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitSearch(input)}
            placeholder="Search wisdom, stoicism, life…"
            className="
              w-full px-4 py-3 rounded-xl
              bg-base-200 outline-none
              focus:ring focus:ring-primary/30
            "
            onFocus={() => input.length >= 2 && setShowSuggestions(true)}
          />

          {/* SUGGESTIONS */}
          {showSuggestions && suggestions?.length > 0 && (
            <ul className="
              absolute z-10 w-full mt-2
              bg-base-100 border border-base-300
              rounded-xl shadow-lg
            ">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => submitSearch(s.value || s)} // support {type, value} from backend
                  className="px-4 py-2 hover:bg-base-200 cursor-pointer flex justify-between"
                >
                  <span>{s.value || s}</span>
                  {s.type && <span className="text-xs opacity-60">{s.type}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* EMPTY STATE */}
        {!q && (
          <p className="text-center opacity-60">
            Start typing to search content
          </p>
        )}

        {/* RESULTS */}
        <div className="space-y-8">
          {results.map((content) => (
            <div
              key={content._id}
              className="border-b border-base-300 pb-6 group"
            >
              <span className="text-xs font-semibold uppercase text-primary">
                {content.category}
              </span>

              <Link to={`/content/${content._id}`}>
                <h2 className="mt-1 text-2xl font-bold group-hover:text-primary">
                  {content.title}
                </h2>
              </Link>

              <p className="mt-2 opacity-80 line-clamp-2">
                {content.words}
              </p>

              <div className="flex justify-between mt-4">
                <span className="text-xs opacity-60">
                  {new Date(content.createdAt).toLocaleDateString()}
                </span>
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

        {/* END */}
        {!hasMore && q && (
          <p className="text-center opacity-50 text-sm">
            • End of results •
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
