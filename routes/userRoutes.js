import { Router } from 'express';
import { checkAuth, registerUser, loginUser, logout } from '../controllers/authController.js';
import tokenVerification from '../middlewares/tokenVerification.js';

const router = Router();

// check is logged in
router.get("/auth/checkauth", checkAuth);

// admin
router.post("/admin/login", loginUser);

// user
router.post("/register", registerUser); 
router.post("/login", loginUser);

// logout 
router.post("/logout", logout); 

export default router;