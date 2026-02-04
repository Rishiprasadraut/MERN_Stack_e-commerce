const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth/middleware");
const adminMiddleware = require("../../middleware/admin/middleware");
const uploadMiddleware = require("../../middleware/upload/middleware");

const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProducts,
  deleteProducts,
  getAllProductAdmin,
  addProductReview,
  updateProductImage,
} = require("../../controllers/products/controllers");

// 🔥 ADMIN ROUTES FIRST
router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  getAllProductAdmin
);

// PUBLIC ROUTES
router.get("/", getAllProduct);
router.get("/:id", getProductById);

// ADMIN CRUD
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  createProduct
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateProducts
);

router.put(
  "/:id/image",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  updateProductImage
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProducts
);

// USER REVIEWS
router.post("/:id/reviews", authMiddleware, addProductReview);

module.exports = router;
