import mongoose, { Schema, model, models } from 'mongoose';

const CMSSchema = new Schema(
  {
    key: { type: String, required: true, unique: true }, // e.g. 'homepage_hero', 'privacy_policy', 'terms_conditions'
    title: { type: String },
    content: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const CMS = models.CMS || model('CMS', CMSSchema);
