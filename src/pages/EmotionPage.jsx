import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetContentsByEmotionQuery } from "../Redux/contentApiSlice";
import FilterBar from "../components/FilterBar";
import LikeButton from "../components/LikeButton";

const emotionList = [
  { emoji: "😊", name: "happy" },
  { emoji: "😢", name: "sad" },
  { emoji: "😡", name: "angry" },
  { emoji: "😌", name: "calm" },
  { emoji: "🔥", name: "motivated" },
  { emoji: "💔", name: "heartbroken" },
  { emoji: "🤔", name: "thoughtful" },
  { emoji: "✨", name: "inspired" },
  { emoji: "😐", name: "neutral" },
  { emoji: "💙", name: "hopeful" },
  { emoji: "😨", name: "fearful" },
];

const emotionColors = {
  happy: "#FFD700",      // gold
  sad: "#5DADE2",        // blue
  angry: "#E74C3C",      // red
  calm: "#82E0AA",       // green
  inspired: "#FFA500",   // orange
  motivated: "#8E44AD",  // purple
  fearful: "#95A5A6",    // gray
  hopeful: "#5DADE2",    // blue
  neutral: "#FDFEFE",    // white
  thoughtful: "#1ABC9C", // teal
  heartbroken: "#34495E",// dark blue-gray
};

const EmotionPage = () => {
  const { emotion } = useParams();

  // Map param to selectedEmotion object
  const initialEmotion = emotionList.find((e) => e.name === emotion) || {
    name: "neutral",
    emoji: "😐",
  };

  const [selectedEmotion, setSelectedEmotion] = useState(initialEmotion);

  const [page, setPage] = useState(1);
  const [contents, setContents] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Fetch content by EMOTION
  const { data, isFetching } = useGetContentsByEmotionQuery({
    emotion: selectedEmotion.name,
    page,
    limit: 10,
  });

  // Reset when emotion param changes
  useEffect(() => {
    const newEmotion =
      emotionList.find((e) => e.name === emotion) || {
        name: "neutral",
        emoji: "😐",
      };
    setSelectedEmotion(newEmotion);
    setPage(1);
    setContents([]);
    setHasMore(true);
  }, [emotion]);

  // Append new data
  useEffect(() => {
    if (data?.contents) {
      setContents((prev) =>
        page === 1 ? data.contents : [...prev, ...data.contents]
      );
      if (data.contents.length < 10) setHasMore(false);
    }
  }, [data, page]);

  const loadMore = () => {
    if (!isFetching && hasMore) setPage((p) => p + 1);
  };

  return (
    <div
      style={{
        backgroundColor: emotionColors[selectedEmotion?.name] || "#FDFEFE",
        minHeight: "100vh",
      }}
    >
      <div className="min-h-screen px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Filter bar */}
          <FilterBar mode="emotion" />

          {/* Page title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4 flex items-center gap-2">
            {selectedEmotion.emoji} Emotion: {selectedEmotion.name}
          </h1>

          {/* Content list */}
          <div className="space-y-8">
            {contents.map((content) => (
              <div
                key={content._id}
                className="border-b border-gray-200 dark:border-neutral-700 pb-6"
              >
                <span className="text-xs text-green-600 dark:text-green-300 font-semibold uppercase tracking-wide">
                  {content.category}
                </span>

                <Link to={`/content/${content._id}`}>
                  <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100 hover:underline">
                    {content.title}
                  </h2>
                </Link>

                {/* Content box with emotion background */}
                <div
                  className="p-4 rounded-lg shadow mt-2"
                  style={{
                    backgroundColor:
                      emotionColors[selectedEmotion?.name] || "#FDFEFE",
                  }}
                >
                  <p>{content.words}</p>
                </div>

                <div className="flex justify-between mt-4">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(content.createdAt).toLocaleDateString()}
                  </span>

                  <LikeButton contentId={content._id} size="sm" />
                </div>
              </div>
            ))}
          </div>

          {/* Loader */}
          {isFetching && (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}

          {/* Load more */}
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

          {/* End message */}
          {!hasMore && (
            <p className="text-center text-gray-400 dark:text-gray-500 text-sm">
              • End of results •
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmotionPage;
