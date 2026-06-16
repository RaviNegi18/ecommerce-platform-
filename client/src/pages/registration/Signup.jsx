import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "@/utills/ToastUtills";
import {
  useRegisterUserMutation,
  useRegisterAdminMutation,
} from "@/redux/api/apiSlice";
import myContext from "@/context/data/myContext";
import { useContext } from "react";

const SignUp = () => {
  const { mode } = useContext(myContext);
  const navigate = useNavigate();
  const isDarkTheme = mode === "dark";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [registerAdmin] = useRegisterAdminMutation();

  const onSubmitSignup = async (data) => {
    try {
      if (data.role === "admin") {
        await registerAdmin(data).unwrap();
      } else {
        await registerUser(data).unwrap();
      }
      showSuccessToast("Signup successful! Welcome aboard 🎉");
      navigate("/sign-in");
    } catch (error) {
      showErrorToast(error?.data?.message || "Oops! Signup failed. Try again.");
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

  return (
    <div className={`min-h-screen px-4 py-10 ${containerClass}`}>
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] items-center">
        <div className="hidden flex-col gap-6 rounded-[2rem] bg-gradient-to-br from-blue-600 to-slate-900 p-10 text-white shadow-2xl lg:flex">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200/90">Create account</p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight">Start shopping with smarter deals.</h1>
          </div>
          <p className="text-slate-200/85 leading-8">
            Sign up now to access personalized offers, order tracking, and secure checkout in one place.
          </p>
          <div className="grid gap-4 rounded-[1.75rem] bg-white/10 p-6 backdrop-blur-xl">
            {[
              "Fast account setup",
              "Exclusive member deals",
              "Order history at a glance",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-100">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 text-blue-100">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-950 ${formClass}`}>
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Sign up</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Create your account</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">Join now for better shopping experiences and personalized offers.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmitSignup)} className="space-y-5">
            {[
              {
                id: "userName",
                type: "text",
                label: "Username",
                placeholder: "Enter your username",
                validation: {
                  required: "Username is required",
                  minLength: { value: 3, message: "At least 3 characters" },
                  maxLength: { value: 15, message: "Max 15 characters" },
                },
              },
              {
                id: "email",
                type: "email",
                label: "Email",
                placeholder: "Enter your email",
                validation: {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                  maxLength: { value: 50, message: "Max 50 characters" },
                },
              },
              {
                id: "password",
                type: "password",
                label: "Password",
                placeholder: "Create a password",
                validation: {
                  required: "Password is required",
                  minLength: { value: 8, message: "At least 8 characters" },
                  pattern: {
                    value: "^(?=.*[A-Za-z])(?=.*d).{8,}$",
                    message: "Must include uppercase, number & special character",
                  },
                },
              },
            ].map(({ id, type, label, placeholder, validation }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  {...register(id, validation)}
                  className={`mt-3 w-full rounded-3xl border px-4 py-3 outline-none transition focus:border-blue-500 ${inputClass}`}
                />
                {errors[id] && <p className="mt-2 text-sm text-red-500">{errors[id].message}</p>}
              </div>
            ))}

            <button
              type="submit"
              className="w-full rounded-3xl bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account? <Link to="/sign-in" className="font-semibold text-blue-600 hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
