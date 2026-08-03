import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Incident } from '@/lib/models/Incident';

export async function GET() {
  try {
    await connectToDatabase();
    const incidents = await Incident.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, incidents });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Unable to load incidents.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, site, severity, reportedBy, phone, description } = await req.json();
    if (!title || !site || !reportedBy || !phone || !description) return NextResponse.json({ success: false, message: 'Please complete all incident details.' }, { status: 400 });
    await connectToDatabase();
    const incidentId = `INC-${new Date().getFullYear()}-${String((await Incident.countDocuments()) + 1).padStart(4, '0')}`;
    const incident = await Incident.create({ incidentId, title, site, severity: ['Low', 'Medium', 'High', 'Critical'].includes(severity) ? severity : 'Medium', reportedBy: `${reportedBy} | ${phone}`, description, status: 'Open' });
    return NextResponse.json({ success: true, incident, message: 'Incident reported. Our command desk has been notified.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Unable to report incident.' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !['Open', 'Investigating', 'Resolved', 'Closed'].includes(status)) return NextResponse.json({ success: false, message: 'Invalid incident update.' }, { status: 400 });
    await connectToDatabase();
    const incident = await Incident.findByIdAndUpdate(id, { status, ...(status === 'Resolved' || status === 'Closed' ? { resolvedAt: new Date() } : {}) }, { new: true });
    return NextResponse.json({ success: true, incident });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Unable to update incident.' }, { status: 500 });
  }
}
