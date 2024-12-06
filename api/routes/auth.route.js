import express from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login); //put for updating a post
router.post("/logout", logout);

export default router;