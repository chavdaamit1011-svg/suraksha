import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Lead } from '@/lib/models/Lead';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    await seedDatabase();
    const leads = await Lead.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const count = await Lead.countDocuments();
    const leadId = `LED-2026-${(100 + count + 1).toString().padStart(3, '0')}`;
    const newLead = await Lead.create({ ...body, leadId });
    return NextResponse.json({ success: true, lead: newLead });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const { id, status, notes } = await req.json();
    const updatedLead = await Lead.findByIdAndUpdate(id, { status, notes }, { new: true });
    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    await connectToDatabase();
    await Lead.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
