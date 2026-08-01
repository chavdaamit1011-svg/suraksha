import mongoose, { Schema, model, models } from 'mongoose';

const TenderSchema = new Schema(
  {
    tenderId: { type: String, required: true, unique: true }, // e.g. TND-2026-904
    title: { type: String, required: true },
    clientCompany: { type: String, required: true },
    durationYears: { type: Number, default: 1 }, // 1 or 2 years
    guardsRequired: { type: Number, required: true },
    annualValue: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Pending Approval', 'Completed', 'Expired'], default: 'Active' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    contractDocUrl: { type: String, default: '#' },
  },
  { timestamps: true }
);

export const Tender = models.Tender || model('Tender', TenderSchema);
