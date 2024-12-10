import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
// the value in place of :id is captured and made available via req.params
router.get("/:id", verifyToken, getUser); // get user profile
router.put("/:id", verifyToken, updateUser); // router.put() for updating profile
router.delete("/:id", verifyToken, deleteUser); // router.delete() for deleting profile

export default router;