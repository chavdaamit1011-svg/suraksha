import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { SupportTicket } from '@/lib/models/SupportTicket';
import { sendEmail } from '@/lib/mailer';

export async function GET() {
  try {
    await connectToDatabase();
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: tickets.length, tickets });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { fullName, companyName, email, phone, subject, message } = await req.json();

    if (!fullName || !email || !phone || !subject || !message) {
      return NextResponse.json({ success: false, message: 'Name, email, phone, subject, and message are required.' }, { status: 400 });
    }

    const ticketId = `TCK-${Date.now().toString().slice(-6)}`;
    const newTicket = await SupportTicket.create({
      ticketId,
      fullName,
      companyName: companyName || '',
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
    });

    // Send email alert to admin
    await sendEmail({
      to: 'dispatch@surakshasecurity.in',
      subject: `[SURAKSHA SUPPORT] New Ticket ${ticketId}: ${subject}`,
      html: `
        <h3>New Support Query Received</h3>
        <p><strong>From:</strong> ${fullName} (${email}, ${phone})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted! Our support team will get back to you shortly.',
      ticketId,
      ticket: newTicket,
    });
  } catch (error: any) {
    console.error('Contact submit error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status, adminResponse } = await req.json();
    if (!id || !['Open', 'In Progress', 'Resolved'].includes(status)) {
      return NextResponse.json({ success: false, message: 'A ticket and valid status are required.' }, { status: 400 });
    }
    await connectToDatabase();
    const ticket = await SupportTicket.findByIdAndUpdate(id, { status, adminResponse: adminResponse || '' }, { new: true });
    if (!ticket) return NextResponse.json({ success: false, message: 'Ticket not found.' }, { status: 404 });
    return NextResponse.json({ success: true, ticket });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Unable to update ticket.' }, { status: 500 });
  }
}
