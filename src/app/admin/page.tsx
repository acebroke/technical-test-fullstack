/**
 * TODO:
 * - Lister les paiements (50 derniers) triés par date desc.
 * - Afficher le total des montants (en centimes) en tête
 * - Colonnes: date, montant, devise, statut, session, email
 */
export default async function AdminPage() {
  return (
    <main className="space-y-4">
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Dashboard /admin</h2>
        <p className="opacity-70 text-sm">
          À implémenter par le candidat (requête DB + rendu du tableau).
        </p>
      </div>
    </main>
  );
}
