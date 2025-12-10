import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  useForgotPasswordStep1Mutation,
  useForgotPasswordStep2Mutation,
} from "../Redux/UserApiSlice";

const ForgotPasswordScreen = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const [forgotPasswordStep1, { isLoading: sendingOtp }] =
    useForgotPasswordStep1Mutation();
  const [forgotPasswordStep2, { isLoading: resetting }] =
    useForgotPasswordStep2Mutation();

  // Step 1 – Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await forgotPasswordStep1({ email }).unwrap();
      console.log("OTP Response:", response);
      setStep(2);
      if(response.message == "1"){
        setSuccess("Your last OTP is still valid. Please check your email.");
      }else{
        setError("OTP sent to your email");
      }
    } catch (err) {
      setError(err?.data?.message || "Failed to send OTP");
    }
  };

  // Step 2 – Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await forgotPasswordStep2({ email, otp, newPassword }).unwrap();
      setSuccess("Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="card w-full max-w-md shadow-2xl rounded-xl p-8 bg-white dark:bg-gray-900 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700 dark:text-indigo-400 transition-colors duration-300">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>

        {error && (
          <p className="text-red-500 dark:text-red-400 mb-4 text-center transition-colors duration-300">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 dark:text-green-400 mb-4 text-center transition-colors duration-300">
            {success}
          </p>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="label font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">
                Enter your email
              </label>
              <input
                type="email"
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-300"
              disabled={sendingOtp}
            >
              {sendingOtp ? "Sending OTP..." : "Send OTP"}
            </button>
            <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="text-indigo-600 dark:text-indigo-400 link"
              >
                Login
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="label font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">
                OTP
              </label>
              <input
                type="number"
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">
                New Password
              </label>
              <input
                type="password"
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">
                Confirm Password
              </label>
              <input
                type="password"
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-300"
              disabled={resetting}
            >
              {resetting ? "Resetting..." : "Reset Password"}
            </button>
            <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Go back?{" "}
              <Link
                to="/login"
                className="text-indigo-600 dark:text-indigo-400 link"
              >
                Login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
