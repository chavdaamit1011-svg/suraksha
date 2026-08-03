import { NextResponse } from 'next/server';

const planAmounts: Record<string, number> = { 'Essential Home': 18500, 'Business Secure': 55500 };

export async function POST(req: Request) {
  try {
    const { planName } = await req.json();
    const amount = planAmounts[planName];
    if (!amount) return NextResponse.json({ success: false, message: 'This plan requires a custom quote before payment.' }, { status: 400 });
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) return NextResponse.json({ success: false, message: 'Razorpay is not configured.' }, { status: 500 });
    const authorization = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`;
    const response = await fetch('https://api.razorpay.com/v1/orders', { method: 'POST', headers: { Authorization: authorization, 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: amount * 100, currency: 'INR', receipt: `suraksha_${Date.now()}` }) });
    const order = await response.json();
    if (!response.ok) return NextResponse.json({ success: false, message: order.error?.description || 'Unable to create payment order.' }, { status: 502 });
    return NextResponse.json({ success: true, order, keyId, amount });
  } catch (error: any) { return NextResponse.json({ success: false, message: error.message || 'Unable to start payment.' }, { status: 500 }); }
}
