import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "@/utills/ToastUtills";
import { Button } from "@/components/ui/button";
import myContext from "@/context/data/myContext";
import { useContext } from "react";
import {
  useLoginUserMutation,
  useLoginAdminMutation,
} from "@/redux/api/apiSlice";
import { setUser } from "@/redux/api/authSlice";
import { setAdmin } from "@/redux/api/authSlice";

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [loginAdmin] = useLoginAdminMutation();
  const { mode } = useContext(myContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkTheme = mode === "dark";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitLogin = async (data) => {
    if (data.role === "admin") {
      try {
        const response = await loginAdmin(data).unwrap();
        if (!response || !response.token || !response.admin) {
          throw new Error("Incomplete admin response");
        }
        dispatch(setAdmin({ admin: response.admin, token: response.token }));
        showSuccessToast("Admin login successful");
        navigate("/");
      } catch (error) {
        console.error("Admin login error detail:", error);
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "Admin login failed, please try again!";
        showErrorToast(errorMessage);
      }
    } else {
      try {
        const response = await loginUser(data).unwrap();
        if (!response || !response.token || !response.user) {
          throw new Error("Incomplete user response");
        }
        dispatch(setUser({ user: response.user, token: response.token }));
        showSuccessToast("User login successful");
        navigate("/");
      } catch (error) {
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "User login failed, please try again!";
        showErrorToast(errorMessage);
      }
    }
  };

  const containerClass = isDarkTheme
    ? "bg-slate-900 text-white"
    : "bg-slate-100 text-gray-800";
  const formClass = isDarkTheme
    ? "bg-slate-800 text-white"
    : "bg-white text-gray-800";
  const inputClass = isDarkTheme
    ? "bg-slate-700 border-slate-600 text-white"
    : "bg-slate-200 text-gray-800";
  const buttonClass = isDarkTheme
    ? "bg-blue-600 hover:bg-blue-800"
    : "bg-blue-500 hover:bg-blue-700";

  return (
    <div
      className={`w-full min-h-screen flex scroll-area::-webkit-scrollbar items-center justify-center ${containerClass} px-4`}
    >
      <div className="flex flex-col   scroll-area::-webkit-scrollbar md:flex-row items-center justify-center gap-8 w-full max-w-6xl">
        <div className="hidden py-10 md:flex flex-1 px-4">
          <img
            src="https://ecme-react.themenate.net/img/others/auth-side-bg.png"
            alt="Login Visual"
            className="w-full h-[600px] mt-10 rounded-r-3xl object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
        </div>

        <div className="flex-1   mt-10 px-4 scroll-area::-webkit-scrollbar  flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmitLogin)}
            className={`flex  pt-10 flex-col justify-start scroll-area::-webkit-scrollbar  space-y-4 p-8 w-[400px] h-[600px] max-w-full shadow-md rounded-lg overflow-hidden ${formClass}`}
          >
            <div className="mb-6">
              <h1 className="text-center text-blue-500 text-3xl font-semibold">
                Welcome Back
              </h1>
              <p
                className={`text-center font-semibold text-md ${
                  isDarkTheme ? "text-white" : "text-gray-700"
                }`}
              >
                Sign in to continue your journey with us
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className={`block mb-1 font-semibold ${
                  isDarkTheme ? "text-white" : "text-gray-600"
                }`}
              >
                Email:
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                  maxLength: {
                    value: 50,
                    message: "Email cannot exceed 50 characters",
                  },
                })}
                className={`p-3 rounded-md w-full border-2 focus:outline-none focus:border-blue-500 ${inputClass}`}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block mb-1 font-semibold ${
                  isDarkTheme ? "text-white" : "text-gray-600"
                }`}
              >
                Password:
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value: "^(?=.*[A-Za-z])(?=.*d).{8,}$",
                    message: "Password must include letters and numbers",
                  },
                })}
                className={`p-3 rounded-md w-full border-2 focus:outline-none focus:border-blue-500 ${inputClass}`}
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="role"
                className={`block mb-1 font-semibold ${
                  isDarkTheme ? "text-white" : "text-gray-600"
                }`}
              >
                Role:
              </label>
              <select
                id="role"
                {...register("role", { required: "Role is required" })}
                className={`p-3 rounded-md w-full border-2 focus:outline-none focus:border-blue-500 ${inputClass}`}
              >
                <option value="admin">Admin</option>
                <option value="reader">User</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className={`${buttonClass} w-full text-white px-4 py-2 rounded-md transition duration-300`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm font-medium mt-4">
              Don't have an account?{" "}
              <span className="text-blue-600 font-semibold ml-1">
                <Link to="/sign-up">Sign Up</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
