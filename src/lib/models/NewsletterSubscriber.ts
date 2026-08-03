import { Schema, model, models } from 'mongoose';

const NewsletterSubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, default: '', trim: true },
    status: { type: String, enum: ['subscribed', 'unsubscribed'], default: 'subscribed' },
  },
  { timestamps: true }
);

export const NewsletterSubscriber =
  models.NewsletterSubscriber || model('NewsletterSubscriber', NewsletterSubscriberSchema);
