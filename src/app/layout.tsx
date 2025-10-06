import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Visionyze Test",
  description: "Stripe + Next.js + Prisma"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="container">
          <header className="mb-6">
            <h1 className="text-2xl font-bold">Visionyze – Stripe Test</h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
