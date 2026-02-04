import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    register({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
  <form
    onSubmit={submitHandler}
    className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
  >
    {/* HEADER */}
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
      <p className="text-gray-500 mt-2">Join us and start your journey today</p>
    </div>

    {/* ERROR MESSAGE */}
    {error && (
      <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md">
        <p className="text-red-700 text-sm font-medium">{error}</p>
      </div>
    )}

    <div className="space-y-5">
      {/* NAME */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="name@example.com"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          autoComplete="username"
        />
      </div>

      {/* PASSWORD GRID (Optional: side by side for larger screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
            Confirm
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            autoComplete="new-password"
          />
        </div>
      </div>
    </div>

    {/* REGISTER BUTTON */}
    <button
      type="submit"
      className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all transform active:scale-[0.98]"
    >
      Create Account
    </button>

    {/* FOOTER */}
    <p className="text-sm text-center text-gray-500 mt-6">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-indigo-600 font-bold hover:text-indigo-500 transition-colors"
      >
        Login
      </Link>
    </p>
  </form>
</div>
  );
}
