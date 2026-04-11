import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shipping = (session as any).shipping_details as { address?: { line1?: string; city?: string; postal_code?: string; country?: string } } | undefined;

    try {
      await prisma.order.create({
        data: {
          stripeId: session.id,
          customerEmail: session.customer_details?.email || "",
          customerName: session.customer_details?.name || "",
          address: shipping?.address?.line1 || "",
          city: shipping?.address?.city || "",
          postalCode: shipping?.address?.postal_code || "",
          country: shipping?.address?.country || "",
          phone: session.customer_details?.phone || null,
          status: "paid",
          subtotal: (session.amount_subtotal || 0) / 100,
          shipping: ((session.amount_total || 0) - (session.amount_subtotal || 0)) / 100,
          total: (session.amount_total || 0) / 100,
        },
      });
    } catch (error) {
      console.error("Order creation error:", error);
    }
  }

  return NextResponse.json({ received: true });
}
