import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";

/**
 * ⚡ Crée une session Stripe Checkout et redirige vers la page de paiement
 * Testable avec `stripe listen --forward-to http://localhost:3000/api/webhook`
 */
export async function POST(req: NextRequest) {
  try {
    // 💰 Informations de base
    const priceId = process.env.STRIPE_PRICE_ID;
    const currency = "eur";
    const amount = 1999; // 19,99 € si tu n'utilises pas un prix existant

    // 🧾 Crée la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: priceId
        ? [
            {
              price: priceId,
              quantity: 1,
            },
          ]
        : [
            {
              price_data: {
                currency,
                product_data: {
                  name: "Visionyze – Paiement test",
                },
                unit_amount: amount, // Montant en centimes
              },
              quantity: 1,
            },
          ],
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
      metadata: {
        environment: process.env.NODE_ENV || "development",
      },
    });

    // ✅ Vérifie que Stripe a bien généré une URL de redirection
    if (!session.url) {
      throw new Error("❌ Impossible de générer l’URL Stripe Checkout");
    }

    console.log("💳 Session créée :", session.id);
    console.log("➡️ Redirection vers :", session.url);

    // 🔁 Redirige le client vers la page Stripe Checkout
    return NextResponse.redirect(session.url, { status: 303 });
  } catch (error: any) {
    console.error("❌ Erreur création Checkout:", error.message);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement Stripe" },
      { status: 500 }
    );
  }
}
