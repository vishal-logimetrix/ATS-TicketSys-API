import UserModel from "../auth/user.model.js";
import TicketModel from "./ticket.model.js";

export const createTicket = async (req, res) => {
  try {
    const {
      serialNumber,
      issueReported,
      description,
      priority,
      additionalInfo,
      productLocation,
      contact,
      organisationName,
      communicationAddress,
      state,
      deviceContact, // Changed from deviceContacts to deviceContact
    } = req.body;

    let parsedContact = {};
    let parsedDeviceContact = {};

    try {
      parsedContact = JSON.parse(contact);
    } catch (err) {
      return res.status(400).json({ message: "Invalid contact format" });
    }

    try {
      parsedDeviceContact = JSON.parse(deviceContact); // Changed to parse single object
    } catch (err) {
      return res.status(400).json({ message: "Invalid deviceContact format" });
    }

    const filePaths = req.files?.map((file) => file.path.replace("public/", "")) || [];

    // Generate ticket ID
    const currentYear = new Date().getFullYear();
    const count = await TicketModel.countDocuments({
      createdAt: {
        $gte: new Date(`${currentYear}-01-01`),
        $lt: new Date(`${currentYear + 1}-01-01`),
      },
    });

    const paddedNumber = String(count + 1).padStart(3, "0");
    const ticketId = `TCK-${currentYear}-${paddedNumber}`;

    const newTicket = await TicketModel.create({
      ticketId,
      serialNumber,
      issueReported,
      description,
      priority,
      additionalInfo,
      productLocation,
      contact: parsedContact,
      organisationName,
      communicationAddress,
      state,
      deviceContact: parsedDeviceContact, // Changed from deviceContacts to deviceContact
      filePaths,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Ticket created", ticket: newTicket });
  } catch (err) {
    console.error("Ticket creation failed:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};


export const getTickets = async (req, res) => {
  try {
    const tickets = await TicketModel.find().sort({ createdAt: -1 });
    
    const totalTickets = tickets.length;
    const totalOpen = tickets.filter(ticket=>ticket.status === 'open').length;
    const totalClosed = tickets.filter(ticket=>ticket.status === 'closed').length;
    const totalInprogress = tickets.filter(ticket=>ticket.status === 'in_progress').length;

    const payload = {
      totalTickets,
      totalOpen,
      totalClosed,
      totalInprogress,
      tickets
    }

    res.json(payload);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};


export const dashBoardData = async (req, res)=>{
  try {
    
    const tickets = await TicketModel.find().sort({ createdAt: -1 });
    const users = await UserModel.find();
    
    
    const totalTickets = tickets.length;
    const totalOpen = tickets.filter(ticket=>ticket.status === 'open').length;
    const totalClosed = tickets.filter(ticket=>ticket.status === 'closed').length;
    const totalInprogress = tickets.filter(ticket=>ticket.status === 'in_progress').length;
    const totalCriticalTickets = tickets.filter(ticket=>ticket.priority === '3').length;
    const totalMediumTickets = tickets.filter(ticket=>ticket.priority === '2').length;
    const totalLowTickets = tickets.filter(ticket=>ticket.priority === '1').length;
    const totalAdmins = users.filter(user=>user.role === 'admin').length;
    const totalSuperAdmins = users.filter(user=>user.role === 'superadmin').length;
    const totalUsers = users.filter(user=>user.role === 'user').length;

    const recentTickets = tickets.slice(0, 5);

    const payload = {
      totalTickets,
      totalOpen,
      totalClosed,
      totalInprogress,
      totalCriticalTickets,
      totalMediumTickets,
      totalLowTickets,
      recentTickets,
      totalAdmins,
      totalSuperAdmins,
      totalUsers
    }

    res.json(payload);

  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
}

export const getTicketById = async (req, res)=>{
  try {
    const { id } = req.params;
    const ticket = await TicketModel.findById(id);
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
}

export const updateTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const { priority, status, closingNote } = req.body;
    const updateData = {};
    if (priority) updateData.priority = priority;
    if (status) updateData.status = status;

    if (status === "closed") {
      if (!closingNote || closingNote.trim() === "") {
        return res.status(400).json({
          message: "Closing note is required when closing the ticket.",
        });
      }
      updateData.closingNote = closingNote;
    }

    updateData.updatedAt = new Date();
    const updatedTicket = await TicketModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({
      message: "Ticket updated successfully",
      ticket: updatedTicket,
    });
  } catch (err) {
    console.error("Error updating ticket:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
