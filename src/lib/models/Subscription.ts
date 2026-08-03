import { Schema, model, models } from 'mongoose';

const SubscriptionSchema = new Schema({
  planName: { type: String, required: true },
  planType: { type: String, default: 'Standard' },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, default: '' },
  location: { type: String, default: '' },
  guardCount: { type: Number, default: 1 },
  duration: { type: String, default: '1 Month' },
  status: { type: String, enum: ['New', 'Contacted', 'Active', 'Cancelled'], default: 'New' },
}, { timestamps: true });

export const Subscription = models.Subscription || model('Subscription', SubscriptionSchema);
