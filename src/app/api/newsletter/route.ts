import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { NewsletterSubscriber } from '@/lib/models/NewsletterSubscriber';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  try {
    await connectToDatabase();
    const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, count: subscribers.length, subscribers });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Unable to load subscribers.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!emailPattern.test(normalizedEmail)) {
      return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
    }

    await connectToDatabase();
    const subscriber = await NewsletterSubscriber.findOneAndUpdate(
      { email: normalizedEmail },
      { $set: { name: typeof name === 'string' ? name.trim() : '', status: 'subscribed' } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, message: 'You are subscribed to the SURAKSHA newsletter.', subscriber });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Unable to subscribe right now.' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !['subscribed', 'unsubscribed'].includes(status)) {
      return NextResponse.json({ success: false, message: 'A subscriber and valid status are required.' }, { status: 400 });
    }
    await connectToDatabase();
    const subscriber = await NewsletterSubscriber.findByIdAndUpdate(id, { status }, { new: true });
    if (!subscriber) return NextResponse.json({ success: false, message: 'Subscriber not found.' }, { status: 404 });
    return NextResponse.json({ success: true, subscriber });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Unable to update subscriber.' }, { status: 500 });
  }
}
