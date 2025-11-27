import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-11-17.clover',
    });

    const { priceId, quantity = 1 } = await req.json();

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId, // Stripe Price ID
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });

    return NextResponse.json({ sessionUrl: session.url });
  } catch (error: any) {
    console.error('Error creating Stripe checkout session:', error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
