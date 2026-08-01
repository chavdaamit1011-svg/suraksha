import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Tender } from '@/lib/models/Tender';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    await seedDatabase();
    const tenders = await Tender.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: tenders.length, tenders });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const tenderId = `TND-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newTender = await Tender.create({ ...body, tenderId });
    return NextResponse.json({ success: true, tender: newTender });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
