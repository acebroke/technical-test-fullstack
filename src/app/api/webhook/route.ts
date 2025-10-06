import { NextRequest, NextResponse } from "next/server";

/**
 * TODO:
 * - Vérifier la signature Stripe (STRIPE_WEBHOOK_SECRET)
 * - Gérer checkout.session.completed
 * - Enregistrer en base (Payment) en idempotence (upsert par stripeSessionId)
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // TODO: implémenter la validation + persistance
  return NextResponse.json({ error: "NOT_IMPLEMENTED" }, { status: 501 });
}
