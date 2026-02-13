const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/auth/middleware');
const adminMiddleware = require('../../middleware/admin/middleware');

const { placeOrder, getMyOrders, getAllOrders, updateOrderStatus, cancelOrder, adminCancelOrder } = require("../../controllers/order/controller");


// user
router.post("/",authMiddleware,placeOrder);
router.get("/myorders",authMiddleware,getMyOrders);
router.put("/:id/cancel",authMiddleware,cancelOrder);

// admin
router.get("/",authMiddleware,adminMiddleware,getAllOrders);
router.put("/:id/status",authMiddleware,adminMiddleware,updateOrderStatus);
router.put("/:id/admin-cancel",authMiddleware,adminMiddleware,adminCancelOrder);


module.exports = router;