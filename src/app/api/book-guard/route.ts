import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Lead } from '@/lib/models/Lead';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { fullName, email, phone, location, guardType, guardCount, shiftType, company, startDate, endDate, shiftStart, shiftEnd, specialRequirements } = data;

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
      // Use the established Lead enum values so this endpoint also works with an already-running MongoDB model.
      source: 'Website Contact',
      leadType: 'Individual Guard',
      status: 'New',
      notes: `Booking Form | Guard Type: ${guardType} | Location: ${location} | Guards per shift: ${guardCount} | Shift: ${shiftType}${shiftStart && shiftEnd ? ` (${shiftStart}–${shiftEnd})` : ''}${startDate ? ` | Start: ${startDate}` : ''}${endDate ? ` | End: ${endDate}` : ''}${specialRequirements ? ` | Requirements: ${specialRequirements}` : ''}`,
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
