const express = require('express')
const router = express.Router();

const authMiddleware = require('../../middleware/auth/middleware');

const { addToCart, getCart, clearCart, removeFromCart, updateCartQty} = require("../../controllers/cart/controllers");


router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete(
    "/remove/:productId",
    authMiddleware,
    removeFromCart
);
router.put("/update", authMiddleware, updateCartQty);
router.delete("/clear", authMiddleware, clearCart);

module.exports = router;