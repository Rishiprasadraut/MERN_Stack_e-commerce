const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth/middleware");
const adminMiddleware = require("../../middleware/admin/middleware");
const { getAdminStats } = require("../../controllers/admin/controllers");

router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getAdminStats
);

module.exports = router;
