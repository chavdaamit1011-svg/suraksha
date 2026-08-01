import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Guard } from '@/lib/models/Guard';
import { seedDatabase } from '@/lib/seed';

export async function GET(req: Request) {
  try {
    await seedDatabase();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status');

    let query: any = {};
    if (search) {
      query.$or = [
        { guardId: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { assignedSite: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) {
      query.status = status;
    }

    const guards = await Guard.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: guards.length, guards });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newGuard = await Guard.create(body);
    return NextResponse.json({ success: true, guard: newGuard });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
