import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/lib/models/User';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    await seedDatabase();
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: users.length, users });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, password, designation, role, permissions } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Name, email, and password are required.' }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, message: 'User with this email already exists.' }, { status: 400 });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role: role || 'admin',
      designation: designation || 'Command Officer Sub-Admin',
      company: 'SURAKSHA Security Operations',
      isActive: true,
      permissions: permissions || ['guards', 'tenders', 'sales-leads', 'incidents', 'assets', 'live-tracking', 'payroll', 'compliance', 'support-desk', 'cms'],
    });

    return NextResponse.json({ success: true, message: 'New Admin created with custom module permissions!', user: newUser });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const { id, permissions, isActive, designation } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { permissions, isActive, designation },
      { new: true }
    );

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
