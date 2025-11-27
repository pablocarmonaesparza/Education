import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-11-17.clover',
    });
    
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    if (!webhookSecret) {
      return new NextResponse('Stripe webhook secret not set.', { status: 500 });
    }

    const buf = await req.arrayBuffer(); // Read the request body as a buffer
    const sig = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(Buffer.from(buf), sig, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        console.log(`Checkout session completed for ${checkoutSession.id}`);
        // TODO: Fulfill the purchase, grant access to the user
        // Example: access checkoutSession.metadata or retrieve customer and payment intent details
        break;
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // TODO: Handle successful payment (e.g., update order status)
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
  } catch (error: any) {
    console.error('Error in Stripe webhook handler:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
