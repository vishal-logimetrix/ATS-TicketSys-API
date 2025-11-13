

import express from "express"
import { getDeviceDetails, getDevices } from "./device.controller.js";
import { isAdminOrSuperAdmin, verifyToken } from "../middleware/auth.middleware.js";
const DeviceRouter = express.Router();

DeviceRouter.get('/get-device', verifyToken, isAdminOrSuperAdmin, getDevices);
DeviceRouter.get('/get-details/:serial_no', verifyToken, isAdminOrSuperAdmin, getDeviceDetails);

export default DeviceRouter;