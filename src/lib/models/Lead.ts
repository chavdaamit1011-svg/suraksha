import mongoose, { Schema, model, models } from 'mongoose';

const LeadSchema = new Schema(
  {
    leadId: { type: String, required: true, unique: true },
    clientName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    source: { type: String, enum: ['Call', 'Face to Face', 'Website Contact', 'Website Book Guard Form', 'Referral'], default: 'Call' },
    leadType: { type: String, enum: ['B2B Tender', 'Individual Guard', 'Armed VIP Escort', 'Agency Contract'], default: 'B2B Tender' },
    status: { type: String, enum: ['New', 'Contacted', 'Proposal Sent', 'Converted', 'Closed'], default: 'New' },
    salesRep: { type: String, default: 'Amit Chavda (Sales Lead)' },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Lead = models.Lead || model('Lead', LeadSchema);
