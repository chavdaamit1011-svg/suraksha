import { Schema, model, models } from 'mongoose';

const TestimonialSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  role: { type: String, default: '', trim: true },
  company: { type: String, default: '', trim: true },
  content: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  status: { type: String, enum: ['Pending', 'Approved'], default: 'Pending' },
}, { timestamps: true });

export const Testimonial = models.Testimonial || model('Testimonial', TestimonialSchema);
