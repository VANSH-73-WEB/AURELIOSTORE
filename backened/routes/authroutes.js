import express from'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const router =express.Router();

// Register Route
router.post('/register', registerUser); 
// Login Route
router.post('/login', loginUser);


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profilepic", protect, (req, res) => {
  res.json(req.user);
});

export default router;