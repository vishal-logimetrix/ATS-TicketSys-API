

import express from "express";
import { Login } from "./user.controller.js";
const UserRoute = express.Router();

UserRoute.get('/login', Login)



export default UserRoute;