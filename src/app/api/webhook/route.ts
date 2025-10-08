import { NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";
import { prisma } from "../../../lib/prisma";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const rawBody = await req.arrayBuffer();
    const bodyBuffer = Buffer.from(rawBody);
    const signature = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      throw new Error("Missing Stripe signature or webhook secret");
    }

    const event = stripe.webhooks.constructEvent(
      bodyBuffer,
      signature,
      webhookSecret
    );

    console.log("✅ Webhook reçu :", event.type);

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;

        const amount = session.amount_total ?? 0;
        const currency = session.currency ?? "eur";
        const status = session.status ?? "completed";
        const email =
          session.customer_details?.email ?? session.customer_email ?? null;

        await prisma.payment.upsert({
          where: { stripeSessionId: session.id },
          update: { amount, currency, status, customerEmail: email },
          create: {
            stripeSessionId: session.id,
            amount,
            currency,
            status,
            customerEmail: email,
          },
        });

        console.log("💾 Paiement enregistré :", session.id);
        break;
      }

      default:
        console.log("ℹ️ Événement ignoré :", event.type);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error("❌ Erreur Webhook Stripe :", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
