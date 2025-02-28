import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5173/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.admin?.token || getState().auth?.token;
      if (token) {
        headers.set("Authorization", "Bearer " + token.trim());
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
    updateUser: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/admin/customer/${id}`,
        method: "PATCH",
        body: updateData,
      }),
    }),
    userProfile: builder.query({
      query: () => "user/profile",
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        method: "POST",
        url: "/products",
        body: product,
      }),
    }),
    getAllProducts: builder.query({
      query: () => "products",
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProductById: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: updateData,
      }),
    }),
    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `/admin/customer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
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
    getAllUsers: builder.query({
      query: () => "/admin/customer",
      providesTags: ["Users"],
    }),
    getAllAdmins: builder.query({
      query: () => "super/admins",
    }),
    getAdminById: builder.query({
      query: (id) => `super/admins/${id}`,
    }),
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

// ✅ Correctly export hooks
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useUserProfileQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductByIdMutation,
  useUpdateProductByIdMutation,
  useDeleteUserByIdMutation,
  useRegisterAdminMutation,
  useLoginAdminMutation,
  useGetAllUsersQuery,
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
  useCreateProductMutation,
} = apiSlice;
