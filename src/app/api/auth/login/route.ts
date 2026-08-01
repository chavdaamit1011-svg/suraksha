import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/lib/models/User';
import { seedDatabase } from '@/lib/seed';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'suraksha_super_secret_jwt_key_2026_99887766554433221100';

export async function POST(req: Request) {
  try {
    await seedDatabase(); // Ensure DB is seeded with superadmin
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    // Direct check for pre-configured Super Admin
    if (email === 'chavdaamit1011@gmail.com' && password === 'Pass@1234') {
      let adminUser = await User.findOne({ email });
      if (!adminUser) {
        adminUser = await User.create({
          name: 'Amit Chavda (Super Admin)',
          email: 'chavdaamit1011@gmail.com',
          password: 'Pass@1234',
          role: 'superadmin',
          designation: 'Managing Director & Chief Admin',
          company: 'SURAKSHA Security Operations Corp',
          isActive: true,
        });
      }

      const token = jwt.sign(
        { id: adminUser._id, email: adminUser.email, role: adminUser.role, name: adminUser.name },
        JWT_SECRET,
        { expiresIn: '2d' } // 2 day session limit as requested
      );

      return NextResponse.json({
        success: true,
        message: 'Super Admin login successful',
        token,
        user: {
          id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
          role: adminUser.role,
          designation: adminUser.designation,
          company: adminUser.company,
          plan: adminUser.plan,
          paymentMethod: adminUser.paymentMethod,
          deviceSessions: adminUser.deviceSessions,
        },
      });
    }

    // Regular DB authentication
    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ success: false, message: 'Account is inactive due to 2-day session policy. Contact Admin.' }, { status: 403 });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '2d' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        designation: user.designation,
        company: user.company,
        plan: user.plan,
        paymentMethod: user.paymentMethod,
        deviceSessions: user.deviceSessions,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
