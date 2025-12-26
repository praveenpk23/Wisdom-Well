import { apiSlice } from "./apiSlice";
import { AI_URL } from "../Constant";

export const aiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Ask AI (Perplexity)
    askAi: builder.mutation({
      query: ({ prompt, chatId }) => ({
        url: `${AI_URL}/ask`,
        method: "POST",
        body: { prompt, chatId },
      }),
      invalidatesTags: ["Chats"],
    }),

    // 🔹 Get all user chats (sidebar)

    getUserChats: builder.query({
      query: ({ page = 1, limit = 4 }) => ({
        url: `${AI_URL}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Chats"],
    }),

    // 🔹 Get single chat by ID
    getChatById: builder.query({
      query: (chatId) => ({
        url: `${AI_URL}/${chatId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAskAiMutation,
  useGetUserChatsQuery,
  useGetChatByIdQuery,
} = aiApiSlice;
