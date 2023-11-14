import { Router } from 'express';
import { checkAuth, registerUser, loginUser, logout } from '../controllers/authController.js';
import { fetchAllUsers, deleteUser } from '../controllers/adminController.js';
import {  } from '../controllers/userController.js';
import tokenVerification from '../middlewares/tokenVerification.js';

const router = Router();

// check is logged in
router.post("/auth/checkauth", checkAuth);

// admin
router.post("/admin/login", loginUser);
router.get("/admin/fetch-users", fetchAllUsers);
router.post("/admin/delete-user", deleteUser);

// user
router.post("/register", registerUser); 
router.post("/login", loginUser);

// logout 
router.post("/logout", logout); 

export default router;