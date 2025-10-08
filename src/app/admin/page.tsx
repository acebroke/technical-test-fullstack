import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const total = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <main className="min-h-screen w-full bg-[#0b0e17] text-gray-100 p-8">
      {/* ---------- HEADER ---------- */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          💼 <span>Tableau de bord</span>{" "}
          <span className="text-gray-500 text-lg">/admin</span>
        </h1>
        <span className="text-sm text-gray-400">
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </header>

      {/* ---------- TOTAL GLOBAL ---------- */}
      <div className="w-full bg-[#111827] border border-gray-700 rounded-md p-4 flex items-center justify-between mb-6">
        <p className="text-gray-400 text-sm">
          Derniers paiements enregistrés (max 50)
        </p>
        <p className="text-lg font-semibold text-blue-400">
          Total : {(total / 100).toLocaleString("fr-FR")} €
        </p>
      </div>

      {/* ---------- TABLEAU EN PLEIN ÉCRAN ---------- */}
      <table className="w-full text-sm text-gray-200 border-collapse">
        <thead className="bg-[#1f2937] text-gray-400 uppercase text-xs border-b border-gray-700 sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Montant (€)</th>
            <th className="px-4 py-3 text-left">Devise</th>
            <th className="px-4 py-3 text-left">Statut</th>
            <th className="px-4 py-3 text-left">Session ID</th>
            <th className="px-4 py-3 text-left">Email client</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-800">
          {payments.length > 0 ? (
            payments.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-[#1a2232] transition-colors duration-150"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date(p.createdAt).toLocaleString("fr-FR")}
                </td>
                <td className="px-4 py-3 font-semibold text-gray-100">
                  {(p.amount / 100).toFixed(2)}
                </td>
                <td className="px-4 py-3">{p.currency.toUpperCase()}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      p.status === "succeeded"
                        ? "bg-green-900 text-green-300"
                        : p.status === "pending"
                        ? "bg-yellow-900 text-yellow-300"
                        : "bg-red-900 text-red-300"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td
                  className="px-4 py-3 truncate text-gray-400 max-w-[250px]"
                  title={p.stripeSessionId}
                >
                  {p.stripeSessionId}
                </td>
                <td className="px-4 py-3 truncate max-w-[250px]">
                  {p.customerEmail ?? (
                    <span className="italic text-gray-500">Non renseigné</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center py-10 text-gray-500 italic"
              >
                Aucun paiement trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
