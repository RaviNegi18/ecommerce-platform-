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
        const errorMessage =
          error?.data?.message || error?.message || "Admin login failed, please try again!";
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
          error?.data?.message || error?.message || "User login failed, please try again!";
        showErrorToast(errorMessage);
      }
    }
  };

  const containerClass = isDarkTheme
    ? "bg-slate-950 text-white"
    : "bg-slate-100 text-slate-900";
  const formClass = isDarkTheme
    ? "bg-slate-900 text-white"
    : "bg-white text-slate-900";
  const inputClass = isDarkTheme
    ? "bg-slate-800 border-slate-700 text-white"
    : "bg-slate-100 border-slate-300 text-slate-900";
  const buttonClass = isDarkTheme
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-blue-600 hover:bg-blue-700";

  return (
    <div className={`min-h-screen px-4 py-10 ${containerClass}`}>
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="hidden flex-col justify-center rounded-[2rem] bg-gradient-to-br from-blue-800 to-slate-900 p-10 text-white shadow-2xl lg:flex">
          <span className="text-sm uppercase tracking-[0.3em] text-blue-200/80">Welcome back</span>
          <h1 className="mt-6 text-5xl font-semibold leading-tight">
            Fast login, effortless shopping.
          </h1>
          <p className="mt-6 max-w-md text-slate-200/90 leading-8">
            Access your account, manage your orders, and get personalized recommendations from the comfort of your dashboard.
          </p>

          <div className="mt-10 space-y-4 rounded-[1.75rem] bg-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200">Why sign in?</p>
            {[
              "Faster checkout",
              "Save wishlists",
              "Track your orders",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-100">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-100">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Login</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Sign in to your account</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">Enter your credentials to continue shopping faster.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                  maxLength: { value: 50, message: "Email cannot exceed 50 characters" },
                })}
                className={`mt-3 w-full rounded-3xl border px-4 py-3 outline-none transition focus:border-blue-500 ${inputClass}`}
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters long" },
                  pattern: { value: "^(?=.*[A-Za-z])(?=.*d).{8,}$", message: "Password must include letters and numbers" },
                })}
                className={`mt-3 w-full rounded-3xl border px-4 py-3 outline-none transition focus:border-blue-500 ${inputClass}`}
              />
              {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              className={`${buttonClass} w-full rounded-3xl px-6 py-3 text-base font-semibold text-white`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Don’t have an account? <Link to="/sign-up" className="font-semibold text-blue-600 hover:underline">Create one</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
