import { createHmac, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) return NextResponse.json({ success: false, message: 'Incomplete payment verification data.' }, { status: 400 });
    const expected = createHmac('sha256', secret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
    const valid = timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));
    return NextResponse.json({ success: valid, message: valid ? 'Payment verified.' : 'Payment signature verification failed.' }, { status: valid ? 200 : 400 });
  } catch { return NextResponse.json({ success: false, message: 'Unable to verify payment.' }, { status: 500 }); }
}
