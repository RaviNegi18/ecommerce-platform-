import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import { ProtectedRouteForAdmin } from "./ProtectedRoutesAdmin";

const Home = lazy(() => import("../pages/home/Home"));
const Cart = lazy(() => import("../pages/cart/Cart"));
const ProfilePage = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../pages/registration/Login"));
const Signup = lazy(() => import("../pages/registration/Signup"));
const ProductInfo = lazy(() => import("../pages/selectedProduct/ProductInfo"));
const AllProducts = lazy(() => import("../pages/Products/Allproducts"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const NoPage = lazy(() => import("./NoPage"));

const DashboardLayout = lazy(() =>
  import("../pages/admin/dashboard/DashboardLayout")
);

const DashboardOverview = lazy(() =>
  import("../pages/admin/dashboard/DashboardOverview")
);
const DashboardProducts = lazy(() =>
  import("../pages/admin/dashboard/DashboardProduct")
);
const DashboardUsers = lazy(() =>
  import("../pages/admin/dashboard/UsersDetail")
);
const OrdersManagement = lazy(() =>
  import("../pages/admin/dashboard/OrdersManagement")
);

const AddProduct = lazy(() =>
  import("../pages/admin/ModifyProduct/AddProduct")
);
const UpdateProduct = lazy(() =>
  import("../pages/admin/ModifyProduct/UpdateProduct")
);

const Loading = () => <div className="text-center">Loading...</div>;

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/productinfo/:_id" element={<ProductInfo />} />

        {/* Protected Routes (For Logged-in Users) */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="users" element={<DashboardUsers />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="products" element={<DashboardProducts />} />
        </Route>

        {/* Admin Product Management */}
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route
          path="/admin/edit-product/:_id"
          element={
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
