const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/auth/middleware')
const adminMiddleware = require('../../middleware/admin/middleware')
const { registerUser, loginUser } = require('../../controllers/auth/controllers');



//register
router.post('/register', registerUser);


//Login
router.post('/login', loginUser);

//profile

router.get('/me', authMiddleware, (req, res) => {
    res.json(req.user);
})

//Admin-Only 
router.get('/admin/profile', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Admin Access Granted",admin:req.user, })
})


module.exports = router;