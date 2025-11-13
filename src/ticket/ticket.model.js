import { Schema, model } from "mongoose";

// const ticketSchema = new Schema(
//   {
//     ticketId: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     serialNumber: {
//       type: String,
//       required: true,
//     },
//     issueReported: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     priority: {
//       type: String,
//       enum: ["1", "2", "3"],
//       required: true,
//     },
//     additionalInfo: {
//       type: String,
//     },

//     contact: {
//       name: {
//         type: String,
//       },
//       phone: {
//         type: String,
//       },
//       email: {
//         type: String,
//       },
//     },

//     productLocation: {
//       type: String,
//     },
//     filePaths: [
//       {
//         type: String,
//       },
//     ],

//     status: {
//       type: String,
//       enum: ["open", "in_progress", "closed"],
//       default: "open",
//     },
//     closingNote: {
//       type: String,
//       default: "",
//     },
//     createdBy: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

const ticketSchema = new Schema(
  {
    ticketId: {
      type: String,
      unique: true,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    issueReported: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["1", "2", "3"],
      required: true,
    },
    additionalInfo: {
      type: String,
    },
    contact: {
      name: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    productLocation: {
      type: String,
    },
    filePaths: [{ type: String }],

    // ✅ New fields added:
    organisationName: {
      type: String,
    },
    communicationAddress: {
      type: String,
    },
    state: {
      type: String,
    },
    deviceContact: {  // Changed from deviceContacts array to single deviceContact object
      name: { type: String },
      phone: { type: String },
      email: { type: String },
    },

    status: {
      type: String,
      enum: ["open", "in_progress", "closed"],
      default: "open",
    },
    closingNote: {
      type: String,
      default: "",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);


const TicketModel = model("Ticket", ticketSchema);
export default TicketModel;
