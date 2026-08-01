import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'suraksha_super_secret_jwt_key_2026_99887766554433221100';

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, company } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Name, email and password are required' }, { status: 400 });
    }

    await connectToDatabase();

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, message: 'Account with this email already exists. Please sign in.' }, { status: 400 });
    }

    // Create new client user
    const newUser = await User.create({
      name,
      email,
      password,
      phone: phone || '',
      company: company || 'Personal Client Account',
      role: 'user',
      plan: 'B2C Standard',
      isActive: true,
      deviceSessions: [
        {
          deviceName: 'Current Web Browser Session',
          ip: '127.0.0.1',
          lastActive: 'Just now',
          status: 'Active',
        },
      ],
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '2d' }
    );

    return NextResponse.json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        company: newUser.company,
        plan: newUser.plan,
        deviceSessions: newUser.deviceSessions,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
