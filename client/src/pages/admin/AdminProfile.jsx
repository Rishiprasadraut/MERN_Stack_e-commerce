import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminProfile } from "../../api/adminApi";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getAdminProfile();
         console.log("ADMIN PROFILE DATA 👉", data);
        setAdmin(data.admin);
      } catch (err) {
        console.log("ERROR 👉", err.response?.data || err.message);
        setError("Failed to load admin profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <h3>Loading profile...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
   <div className="p-4">
  <button
    onClick={() => navigate(-1)}
    className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium"
  >
    ← Back
  </button>
  <div className="max-w-md mx-auto p-6 bg-white rounded-xl border shadow-lg">
    <div className="flex items-center space-x-4">
      <div className="shrink-0">
        <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
          {admin.name?.[0]?.toUpperCase() || "A"}
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-2">Admin Profile</h2>
        <div className="space-y-1">
          <p className="text-gray-700">
            <strong>Name:</strong> {admin.name}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {admin.email}
          </p>
          <p className="text-gray-700">
            <strong>Role:</strong> {admin.role}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default AdminProfile;
