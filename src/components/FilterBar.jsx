import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const categoriesList = [
  "Philosophy",
  "Wisdom",
  "Mental Health",
  "Self-Improvement",
  "Productivity",
  "Stoicism",
  "Life",
];

const forPeopleList = [
  "Entrepreneurs",
  "Students",
  "Thinkers",
  "Leaders",
  "Fitness People",
];

const FilterBar = ({ mode }) => {
  const navigate = useNavigate();
  const params = useParams();
  
  // current selected filter
  const active = params.cg || params.fp;

  return (
    <div className="space-y-4">

      {/* ✅ CATEGORY FILTERS */}
      {(mode === "category" || mode === "both") && (
        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">
            Categories
          </h3>

          <div className="flex flex-wrap gap-2">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => navigate(`/category/${cat}`)}
                className={`
                  px-4 py-1.5 text-sm rounded-full transition border 
                  ${
                    active === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-700"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ✅ FOR PEOPLE FILTERS */}
      {(mode === "for" || mode === "both") && (
        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">
            For People
          </h3>

          <div className="flex flex-wrap gap-2">
            {forPeopleList.map((p) => (
              <button
                key={p}
                onClick={() => navigate(`/for/${p}`)}
                className={`
                  px-4 py-1.5 text-sm rounded-full transition border
                  ${
                    active === p
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-700"
                  }
                `}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default FilterBar;