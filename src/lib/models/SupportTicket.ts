import mongoose, { Schema, model, models } from 'mongoose';

const SupportTicketSchema = new Schema(
  {
    ticketId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    companyName: { type: String, default: '' },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
    adminResponse: { type: String, default: '' },
  },
  { timestamps: true }
);

export const SupportTicket = models.SupportTicket || model('SupportTicket', SupportTicketSchema);
