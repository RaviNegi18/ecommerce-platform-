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
      let response;
      response =
        data.role === "admin"
          ? await registerAdmin(data).unwrap()
          : await registerUser(data).unwrap();

      showSuccessToast("Signup successful! Welcome aboard 🎉");
      navigate("/sign-in");
    } catch (error) {
      showErrorToast(error?.data?.message || "Oops! Signup failed. Try again.");
    }
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 p-6 ${
        isDarkTheme ? "bg-slate-900 text-white" : "bg-slate-100 text-gray-800"
      }`}
    >
      <div className="w-full h-[750px] mt-10 flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmitSignup)}
          className={`space-y-6 p-8 w-[400px] shadow-lg rounded-lg transition-all duration-300 ${
            isDarkTheme ? "bg-slate-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          <h1 className="text-center text-blue-500 text-3xl font-bold">
            Create Your Account
          </h1>
          <p className="text-center text-md font-medium mb-4">
            Join us and unlock exclusive benefits!
          </p>

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
              placeholder: "Enter your password",
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
              <label htmlFor={id} className="block mb-2 font-semibold">
                {label}:
              </label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(id, validation)}
                className={`p-3 rounded-md w-full border-2 focus:outline-none focus:border-blue-500 ${
                  isDarkTheme
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-gray-100 text-gray-800 placeholder-gray-500"
                }`}
              />
              {errors[id] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[id].message}
                </p>
              )}
            </div>
          ))}

          <div>
            <label htmlFor="role" className="block mb-2 font-semibold">
              Select Role:
            </label>
            <select
              id="role"
              {...register("role", { required: "Role selection is required" })}
              className={`p-3 rounded-md w-full border-2 focus:outline-none focus:border-blue-500 ${
                isDarkTheme
                  ? "bg-slate-700 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full text-white px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
              isDarkTheme
                ? "bg-blue-600 hover:bg-blue-800"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-center text-sm font-medium  mt-4">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-blue-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden h-[750px] mt-10  lg:flex w-full justify-center">
        <img
          src="https://ecme-react.themenate.net/img/others/auth-side-bg.png"
          alt="Sign Up Illustration"
          className="w-full h-[750px]  object-cover rounded-r-3xl opacity-90 shadow-lg"
        />
      </div>
    </div>
  );
};

export default SignUp;
