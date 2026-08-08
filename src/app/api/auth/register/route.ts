import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'suraksha_super_secret_jwt_key_2026_99887766554433221100';

export async function POST(req: Request) {
  try {
    const { name, username, email, password, phone, company, accountType } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Full name, email and password are required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username ? username.trim().toLowerCase() : cleanEmail.split('@')[0];
    const cleanPhone = phone ? phone.trim() : '';

    await connectToDatabase();

    // Check if user already exists with email, username or phone
    const existing = await User.findOne({
      $or: [
        { email: cleanEmail },
        { username: cleanUsername },
        ...(cleanPhone ? [{ phone: cleanPhone }] : []),
      ],
    });

    if (existing) {
      let field = 'email';
      if (existing.email === cleanEmail) field = 'email address';
      else if (existing.username === cleanUsername) field = 'username';
      else if (cleanPhone && existing.phone === cleanPhone) field = 'phone number';

      return NextResponse.json({
        success: false,
        message: `An account with this ${field} already exists. Please sign in or use another ${field}.`,
      }, { status: 400 });
    }

    // Create new client user
    const newUser = await User.create({
      name,
      username: cleanUsername,
      email: cleanEmail,
      password,
      phone: cleanPhone,
      company: company || 'Personal Client Account',
      accountType: ['individual', 'client', 'agency'].includes(accountType) ? accountType : (company?.trim() ? 'client' : 'individual'),
      role: 'user',
      plan: 'B2C Standard',
      isActive: true,
      deviceSessions: [
        {
          deviceName: 'Current Web Browser Session',
          ip: '127.0.0.1',
          lastActive: new Date(),
          status: 'Active',
        },
      ],
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        company: newUser.company,
        plan: newUser.plan,
        deviceSessions: newUser.deviceSessions,
        loginTimestamp: Date.now(),
        sessionExpiresInDays: 7,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
