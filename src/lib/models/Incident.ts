import mongoose, { Schema, model, models } from 'mongoose';

const IncidentSchema = new Schema(
  {
    incidentId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    site: { type: String, required: true },
    severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
    status: { type: String, enum: ['Open', 'Investigating', 'Resolved', 'Closed'], default: 'Open' },
    reportedBy: { type: String, required: true },
    description: { type: String, required: true },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

export const Incident = models.Incident || model('Incident', IncidentSchema);
