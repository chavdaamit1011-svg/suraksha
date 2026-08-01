import mongoose, { Schema, model, models } from 'mongoose';

const AssetSchema = new Schema(
  {
    assetId: { type: String, required: true, unique: true },
    name: { type: String, required: true }, // e.g. "Body Cam 4K", "Long-Range Walkie Talkie"
    category: { type: String, enum: ['Communication', 'Surveillance', 'Armor & Uniform', 'Tactical Gear'], default: 'Tactical Gear' },
    status: { type: String, enum: ['In Use', 'Available', 'Under Maintenance', 'Required'], default: 'Available' },
    assignedToGuard: { type: String, default: 'Unassigned' },
    assignedDate: { type: Date },
    serialNumber: { type: String },
  },
  { timestamps: true }
);

export const Asset = models.Asset || model('Asset', AssetSchema);
