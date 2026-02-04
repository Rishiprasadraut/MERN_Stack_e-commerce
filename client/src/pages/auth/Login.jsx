import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    login({ email, password });
  };

  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-50">
  <form 
    className="flex flex-col gap-6 w-full max-w-md m-5 border border-gray-100 rounded-2xl p-8 shadow-2xl bg-white" 
    onSubmit={submitHandler}
  >
    {/* Header */}
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
      <p className="text-gray-500 text-sm">Please enter your details to sign in</p>
    </div>

    {/* Input Group */}
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
        <input 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
        <input
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
    </div>

    {/* Submit Button */}
    <button 
      type="submit"
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
    >
      Sign In
    </button>

    {/* Register Link */}
    <p className="text-center text-sm text-gray-600 mt-2">
      Don't have an account?{' '}
      <a 
        href="/register" 
        className="text-indigo-600 font-semibold hover:underline decoration-2 underline-offset-4"
      >
        Register here
      </a>
    </p>
  </form>
</div>
  );
}
