import mongoose, { Schema, model, models } from 'mongoose';

const GuardSchema = new Schema(
  {
    guardId: { type: String, required: true, unique: true }, // e.g. SUR-G8842
    name: { type: String, required: true },
    phone: { type: String, required: true },
    photo: { type: String, default: '/guard_avatar.png' },
    status: { type: String, enum: ['Active', 'Inactive', 'On Duty', 'On Patrol', 'Training'], default: 'Active' },
    onlineStatus: { type: String, enum: ['Online', 'Offline'], default: 'Online' },
    agency: { type: String, default: 'Suraksha Direct Agency' },
    assignedSite: { type: String, default: 'Unassigned' },
    currentLocation: {
      lat: { type: Number, default: 28.6139 },
      lng: { type: Number, default: 77.209 },
      address: { type: String, default: 'HQ Security Hub, Sector 12' },
    },
    assetsAllocated: [{ type: String }],
    badges: [{ type: String }],
    trainingCompleted: { type: Boolean, default: true },
    experienceYears: { type: Number, default: 3 },
  },
  { timestamps: true }
);

export const Guard = models.Guard || model('Guard', GuardSchema);
