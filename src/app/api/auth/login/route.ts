import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/lib/models/User';
import { seedDatabase } from '@/lib/seed';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'suraksha_super_secret_jwt_key_2026_99887766554433221100';

export async function POST(req: Request) {
  try {
    await seedDatabase(); // Ensure DB is seeded with superadmin
    const { identifier, email, password } = await req.json();

    const loginId = (identifier || email || '').trim();

    if (!loginId || !password) {
      return NextResponse.json({ success: false, message: 'Username/Email/Phone and password are required' }, { status: 400 });
    }

    const cleanIdLower = loginId.toLowerCase();

    // Direct check for pre-configured Super Admin (accepts email, username 'chavdaamit', or phone '9876543210')
    const isSuperAdminId = ['chavdaamit1011@gmail.com', 'chavdaamit', '9876543210', '+91 98765 43210'].includes(loginId) || cleanIdLower.includes('chavdaamit');

    if (isSuperAdminId && password === 'Pass@1234') {
      let adminUser = await User.findOne({ email: 'chavdaamit1011@gmail.com' });
      if (!adminUser) {
        adminUser = await User.create({
          name: 'Amit Chavda (Super Admin)',
          username: 'chavdaamit',
          email: 'chavdaamit1011@gmail.com',
          phone: '+91 98765 43210',
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
        { expiresIn: '2d' }
      );

      return NextResponse.json({
        success: true,
        message: 'Super Admin login successful',
        token,
        user: {
          id: adminUser._id,
          name: adminUser.name,
          username: adminUser.username || 'chavdaamit',
          email: adminUser.email,
          phone: adminUser.phone,
          role: adminUser.role,
          designation: adminUser.designation,
          company: adminUser.company,
          plan: adminUser.plan,
          paymentMethod: adminUser.paymentMethod,
          deviceSessions: adminUser.deviceSessions,
        },
      });
    }

    // Regular DB authentication matching Username, Email OR Phone
    await connectToDatabase();
    const user = await User.findOne({
      $or: [
        { email: cleanIdLower },
        { username: cleanIdLower },
        { phone: loginId },
      ],
    });

    if (!user || user.password !== password) {
      return NextResponse.json({ success: false, message: 'Invalid Username/Email/Phone or password credentials' }, { status: 401 });
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
