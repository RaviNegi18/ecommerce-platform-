import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userdata) => ({
        url: "user/register",
        method: "POST",
        body: userdata,
      }),
    }),
    loginUser: builder.mutation({
      query: (userdata) => ({
        url: "user/login",
        method: "POST",
        body: userdata,
      }),
    }),
    userProfile: builder.query({
      query: () => "user/profile",
    }),

    getAllProducts: builder.query({
      query: () => "products",
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),

    registerAdmin: builder.mutation({
      query: (admindata) => ({
        url: "admin/register",
        method: "POST",
        body: admindata,
      }),
    }),
    loginAdmin: builder.mutation({
      query: (admindata) => ({
        url: "admin/login",
        method: "POST",
        body: admindata,
      }),
    }),

    //SuperAdmin - Admin Masnagement
    getAllAdmins: builder.query({
      query: () => "super/admins",
    }),
    getAdminById: builder.query({
      query: (id) => `super/admins/${id}`,
    }),

    //OTP Management
    generateOtp: builder.mutation({
      query: (otpdata) => ({
        url: "otp/generate",
        method: "POST",
        body: otpdata,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpdata) => ({
        url: "otp/verify",
        method: "POST",
        body: otpdata,
      }),
    }),
    resetPassword: builder.mutation({
      query: (passwordData) => ({
        url: "otp/reset-password",
        method: "POST",
        body: passwordData,
      }),
    }),

    // s Orders
    placeOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "orders",
        method: "POST",
        body: orderDetails,
      }),
    }),
    getOrderById: builder.query({
      query: (id) => `orders/${id}`,
    }),
    getAllOrders: builder.query({
      query: () => "orders",
    }),
    updateOrder: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `orders/${id}`,
        method: "PATCH",
        body: updateData,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUserProfileQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useRegisterAdminMutation,
  useLoginAdminMutation,
  useGetAllAdminsQuery,
  useGetAdminByIdQuery,
  useGenerateOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  usePlaceOrderMutation,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = apiSlice;
