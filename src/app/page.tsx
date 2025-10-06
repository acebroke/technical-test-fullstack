import Link from "next/link";

export default function Home() {
  return (
    <main className="card space-y-4">
      <h2 className="text-xl font-semibold">Produit numérique – Pack Visionyze</h2>
      <p>Accédez à un contenu premium (fictif) après paiement Stripe (mode test).</p>
      <p className="text-3xl font-bold">19.99 €</p>
      <form action="/api/checkout" method="POST">
        <button className="btn" type="submit">Acheter</button>
      </form>
      <div className="text-xs opacity-70">
        Utilisez les cartes de test Stripe (ex: 4242 4242 4242 4242).
      </div>
      <div className="pt-4">
        <Link className="underline" href="/admin">Aller au dashboard admin</Link>
      </div>
    </main>
  );
}
