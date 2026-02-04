import api from './axios';

export const placeOrder = async (shippingAddress) => {
    const res = await api.post("/orders", { shippingAddress });
    return res.data;
};

export const getMyOrders = async () => {
    const res = await api.get("/orders/myorders");
    return res.data;
};


export const cancelOrder = async (orderId) => {
    const res = await api.put(`/orders/${orderId}/cancel`);
    return res.data;
};


export const getAllOrders = async () => {
    const res = await api.get("/orders");
    return res.data;
};

export const updateOrderStatus = async (orderId, status) => {
    const res = await api.put(`/orders/${orderId}/status`, { status });
    return res.data;
};
