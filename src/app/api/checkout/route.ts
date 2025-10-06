import { NextRequest, NextResponse } from "next/server";

/**
 * TODO:
 * - Créer une session Stripe Checkout côté serveur
 * - Rediriger l'utilisateur vers l'URL de paiement
 * - Utiliser STRIPE_PRICE_ID si fourni, sinon un prix inline 19.99 EUR
 */
export async function POST(_req: NextRequest) {
  // TODO: implémenter l'appel Stripe
  // return NextResponse.redirect(session.url!, { status: 303 });
  return NextResponse.json({ error: "NOT_IMPLEMENTED" }, { status: 501 });
}
