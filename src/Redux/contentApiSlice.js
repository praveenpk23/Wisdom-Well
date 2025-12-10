import { apiSlice } from "./apiSlice";
import { CONTENT_URL } from "../Constant";

export const contentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ 1. Get all contents (Feed)
    getContents: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `${CONTENT_URL}?page=${page}&limit=${limit}`,
        method: "GET",
        credentials: "include", // ✅ crucial!
      }),
      providesTags: ["Content"],
    }),

    // ✅ 2. Get content by ID
    getContentById: builder.query({
      query: (id) => ({
        url: `${CONTENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Content"],
    }),

    // ✅ 3. Get contents by Category
    getContentsByCategory: builder.query({
      query: ({ category, page = 1, limit = 10 }) => ({
        url: `${CONTENT_URL}/category/${category}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Content"],
    }),

   // ✅ 4. Get contents by Audience "for"
getContentsByFor: builder.query({
  query: ({ forValue, page = 1, limit = 10 }) => ({
    url: `${CONTENT_URL}/for/${forValue}?page=${page}&limit=${limit}`,
    method: "GET",
  }),
  providesTags: ["Content"],
}),

// ✅ Get contents by Emotion
getContentsByEmotion: builder.query({
  query: ({ emotion, page = 1, limit = 10 }) => ({
    url: `${CONTENT_URL}/emotion/${emotion}?page=${page}&limit=${limit}`,
    method: "GET",
  }),
  providesTags: ["Content"],
}),


    // ✅ 5. Like / Unlike toggle
    toggleLike: builder.mutation({
      query: (contentId) => ({
        url: `${CONTENT_URL}/like-toggle`,
        method: "POST",
        body: { contentId },
      }),
      // invalidatesTags: ["Content", "Like"],
      invalidatesTags: (result, error, contentId) => [
  { type: "Like", id: contentId },
  { type: "Content", id: contentId }, // optional for full content refresh
]

    }),

    // ✅ 6. Get Like Count for a content 
    getLikesCount: builder.query({
      query: (contentId) => ({
        url: `${CONTENT_URL}/count/${contentId}`,
        method: "GET",
      }),
      // providesTags: ["Like"],
      providesTags: (result, error, contentId) => [{ type: "Like", id: contentId }]

    }),

// Admin: Create content
    createContent: builder.mutation({
      query: (newContent) => ({
        url: `${CONTENT_URL}`,
        method: "POST",
        body: newContent,
        credentials: "include",
      }),
      invalidatesTags: ["Content"],
    }),

    // 🟢 Admin: Update content
    updateContent: builder.mutation({
      query: ({ id, updatedContent }) => ({
        url: `${CONTENT_URL}/${id}`,
        method: "PUT",
        body: updatedContent,
        credentials: "include",
      }),
      invalidatesTags: ["Content"],
    }),

    // 🟢 Admin: Delete content
    deleteContent: builder.mutation({
      query: (id) => ({
        url: `${CONTENT_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Content"],
    }),



  }),
});

export const {
  useGetContentsQuery,
  useGetContentByIdQuery,
  useGetContentsByCategoryQuery,
  useGetContentsByForQuery,
  useToggleLikeMutation,
  useGetLikesCountQuery,
  useGetContentsByEmotionQuery,
  // Admin CRUD hooks
  useCreateContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
  
} = contentApiSlice;
