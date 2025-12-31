import { apiSlice } from "./apiSlice";
import { USER_URL } from "../Constant";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register: builder.mutation({
    //   query: (data) => ({
    //     url: `${USER_URL}/register`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    registerStep1: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register/step1`,
        method: "POST",
        body: data,
      }),
    }),

    registerVerify: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register/verify`,
        method: "POST",
        body: data,
      }),
    }),


    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `${USER_URL}/getuser?userId=${userId}`,
        method: "GET",
      }),
      // providesTags:['User']
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUserProfile: builder.mutation({
      query: (updatedData) => ({
        url: `${USER_URL}/profileUpdate`, // your route
        method: "PUT",
        body: updatedData,
      }),
      // After updating, invalidate "User" so profile refetches
      invalidatesTags: ["User"],
    }),
     // Forgot Password Step 1 – Send OTP
    forgotPasswordStep1: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/forgetpassword/step1`,
        method: "POST",
        body: data,
      }),
    }),

    // Forgot Password Step 2 – Reset password
    forgotPasswordStep2: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/forgetpassword/step2`,
        method: "POST",
        body: data,
      }),
    }),
    // Check username
    checkUsername: builder.query({
      query: (username) => ({
        url: `${USER_URL}/check-username`,
        params: { username },
      }),
    }),
  }),
});
export { userApiSlice };
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserByIdQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useRegisterVerifyMutation, 
  useRegisterStep1Mutation,
  useForgotPasswordStep1Mutation,
  useForgotPasswordStep2Mutation,
  useCheckUsernameQuery,
} = userApiSlice;
