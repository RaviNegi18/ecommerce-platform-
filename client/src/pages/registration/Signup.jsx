import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "@/utills/ToastUtills";
import { useRegisterUserMutation } from "@/redux/api/apiSlice";
import myContext from "@/context/data/myContext";
import { useContext } from "react";

const SignUp = () => {
  const context = useContext(myContext);
  const { mode } = context;
  const navigate = useNavigate();
  const isDarkTheme = mode === "dark";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Use the mutation hook to register a new user
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onSubmitSignup = async (data) => {
    try {
      await registerUser(data).unwrap();
      showSuccessToast("Signup successful!");
      navigate("/sign-in");
    } catch (error) {
      const errorMessage =
        error?.data?.message || "Signup failed. Please try again.";
      showErrorToast(errorMessage);
    }
  };

  const containerClass = isDarkTheme
    ? "bg-slate-800 text-white"
    : "bg-slate-100 text-slate-800";

  const formClass = isDarkTheme
    ? "bg-slate-700 text-white"
    : "bg-slate-100 text-slate-800";

  const inputClass = isDarkTheme
    ? "bg-slate-600 border-slate-600 text-slate-200"
    : "bg-slate-200 text-gray-800 placeholder-gray-500";

  const buttonClass = isDarkTheme
    ? "bg-blue-600 hover:bg-blue-800"
    : "bg-blue-500 hover:bg-blue-700";

  const labelClass = isDarkTheme ? "text-gray-300" : "text-gray-700";

  return (
    <div
      className={`w-[100%] h-[100vh] flex flex-col lg:flex-row items-center justify-center gap-8 sm:mt-6 ${containerClass}`}
    >
      <div className="w-full flex justify-center lg:justify-center">
        <form
          onSubmit={handleSubmit(onSubmitSignup)}
          className={`space-y-4 px-6 py-8 w-[400px] pt-20 max-w-full mx-6 sm:mx-0 shadow-md opacity-80 sm:mt-10 rounded-lg ${formClass}`}
        >
          <h1 className="text-center text-blue-500 text-3xl font-semibold">
            Sign Up
          </h1>
          <p
            className={`text-center text-md font-lg mb-6 ${
              isDarkTheme ? "text-white" : "text-slate-800"
            }`}
          >
            Enter your details to create an account
          </p>

          <div>
            <label
              htmlFor="username"
              className={`block mb-2 font-semibold ${labelClass}`}
            >
              Username:
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("userName", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username should be at least 3 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Username cannot exceed 15 characters",
                },
              })}
              className={`p-3 rounded-md w-full border-2 ${inputClass} focus:outline-none focus:border-blue-500`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className={`block mb-2 font-semibold ${labelClass}`}
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
              className={`p-3 rounded-md w-full border-2 ${inputClass} focus:outline-none focus:border-blue-500`}
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
              className={`block mb-2 font-semibold ${labelClass}`}
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
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must include at least one uppercase letter, one number, and one special character.",
                },
              })}
              className={`p-3 rounded-md w-full border-2 ${inputClass} focus:outline-none focus:border-blue-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full text-white px-4 py-2 rounded-md ${buttonClass} transition duration-300`}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>

          <p
            className={`${
              isDarkTheme ? "text-white" : "text-gray-700"
            } text-center text-sm mt-4`}
          >
            Already have an account?
            <Link
              to="/sign-in"
              className="text-blue-600 font-semibold ml-1 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden lg:block mt-10 w-full h-full">
        <img
          src="https://ecme-react.themenate.net/img/others/auth-side-bg.png"
          alt="Sign Up Illustration"
          className="w-[600px] rounded-r-3xl h-[510px] mt-10 object-cover opacity-80"
        />
      </div>
    </div>
  );
};

export default SignUp;
