import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoutes";
import { ProtectedRouteForAdmin } from "./ProtectedRoutesAdmin";

const Home = lazy(() => import("../pages/home/Home"));
const Order = lazy(() => import("../pages/order/Order"));
const Cart = lazy(() => import("../pages/cart/Cart"));
const Dashboard = lazy(() => import("../pages/admin/dashboard/Dashboard"));
const NoPage = lazy(() => import("../pages/nopage/NoPage"));
const Login = lazy(() => import("../pages/registration/Login"));
const Signup = lazy(() => import("../pages/registration/Signup"));
const ProductInfo = lazy(() => import("../pages/selectedProduct/ProductInfo"));
const AddProduct = lazy(() => import("../pages/admin/page/AddProduct"));
const UpdateProduct = lazy(() => import("../pages/admin/page/UpdateProduct"));
const Allproducts = lazy(() => import("../pages/Products/Allproducts"));

const AppRoutes = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Allproducts /> },
  { path: "/productinfo/:_id", element: <ProductInfo /> },
  {
    path: "/order",
    element: (
      <ProtectedRoute>
        <Order />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRouteForAdmin>
        <Dashboard />
      </ProtectedRouteForAdmin>
    ),
  },
  {
    path: "/dashboard/addproduct",
    element: (
      <ProtectedRouteForAdmin>
        <AddProduct />
      </ProtectedRouteForAdmin>
    ),
  },
  {
    path: "/dashboard/updateproduct",
    element: (
      <ProtectedRouteForAdmin>
        <UpdateProduct />
      </ProtectedRouteForAdmin>
    ),
  },
  { path: "/sign-in", element: <Login /> },
  { path: "/sign-up", element: <Signup /> },
  { path: "*", element: <NoPage /> },
];

export default AppRoutes;
