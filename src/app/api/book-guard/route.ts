import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Lead } from '@/lib/models/Lead';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { fullName, email, phone, location, guardType, guardCount, shiftType, company } = data;

    if (!fullName || !email || !phone || !guardCount) {
      return NextResponse.json({ success: false, message: 'All required fields must be filled.' }, { status: 400 });
    }

    await connectToDatabase();

    const count = await Lead.countDocuments();
    const leadId = `LED-2026-${(100 + count + 1).toString().padStart(3, '0')}`;

    const newLead = await Lead.create({
      leadId,
      clientName: company || fullName,
      contactPerson: fullName,
      phone,
      email,
      source: 'Website Book Guard Form',
      leadType: guardType.includes('Armed') ? 'Armed VIP Escort' : 'Individual Guard',
      status: 'New',
      notes: `Location: ${location} | Guards: ${guardCount} | Shift: ${shiftType}`,
    });

    return NextResponse.json({
      success: true,
      message: 'Guard deployment request submitted successfully to Suraksha Command Center!',
      lead: newLead,
    });
  } catch (error: any) {
    console.error('Book guard submit error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
