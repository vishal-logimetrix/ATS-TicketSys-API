

import express from "express";
import { getUsers, Login, Register, updateUser } from "./user.controller.js";
import { isAdminOrSuperAdmin, verifyToken } from "../middleware/auth.middleware.js";
const UserRoute = express.Router();

UserRoute.post('/login', Login);
UserRoute.post('/register', verifyToken, isAdminOrSuperAdmin, Register);
UserRoute.get('/users',verifyToken, isAdminOrSuperAdmin, getUsers);
UserRoute.put('/:id',verifyToken, isAdminOrSuperAdmin, updateUser);




export default UserRoute;