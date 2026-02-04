const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/auth/middleware')
const adminMiddleware = require('../../middleware/admin/middleware')
const { createCategory, getCategories, deleteCategory } = require('../../controllers/category/controller');



router.get('/',getCategories);
router.post('/',authMiddleware,adminMiddleware,createCategory);
router.delete('/:id',authMiddleware,adminMiddleware,deleteCategory);


module.exports = router;