import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: '' },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'agency', 'user'],
      default: 'user',
    },
    designation: { type: String, default: 'Client Member' },
    company: { type: String, default: '' },
    accountType: { type: String, enum: ['individual', 'client', 'agency', 'user'], default: 'individual' },
    isActive: { type: Boolean, default: true },
    permissions: [{ type: String }], // Module keys: 'guards', 'tenders', 'sales-leads', 'incidents', 'assets', 'live-tracking', 'payroll', 'compliance', 'support-desk', 'cms'
    lastLogin: { type: Date, default: Date.now },
    plan: { type: String, default: 'Standard' },
    paymentMethod: { type: String, default: 'Static Card (Ending 4242)' },
    deviceSessions: [
      {
        deviceId: { type: String },
        deviceName: { type: String },
        ip: { type: String },
        location: { type: String },
        lastActive: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const User = models.User || model('User', UserSchema);
