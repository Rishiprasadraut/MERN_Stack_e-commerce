import api from "./axios";

export const getAdminStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};

// api/adminApi.js
export const getAdminProfile = async () => {
  const res = await api.get("/auth/admin/profile");
  return res.data;
};

export const adminCancelOrder = async (orderId) => {
  const res = await api.put(`/orders/${orderId}/admin-cancel`);
  return res.data;
};
