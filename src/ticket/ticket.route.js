import express from "express";
import upload from "../middleware/upload.middleware.js";
import { createTicket, dashBoardData, getTicketById, getTickets, updateTicketById } from "./ticket.controller.js";
import { isAdminOrSuperAdmin, verifyToken } from "../middleware/auth.middleware.js";

const TicketRouter = express.Router();

// This will accept up to 5 files from the frontend field name 'files'
TicketRouter.post("/create",verifyToken, isAdminOrSuperAdmin, upload.array("files", 5), createTicket);
TicketRouter.get("/list",verifyToken, getTickets);
TicketRouter.get("/list/:id",verifyToken, getTicketById);
TicketRouter.put ("/:id", verifyToken, isAdminOrSuperAdmin, updateTicketById);
TicketRouter.get ("/dashboard", verifyToken, dashBoardData);
export default TicketRouter;


