"use client";

import Header from "@/shared/ui/Header";
import Footer from "@/shared/ui/Footer";

const routes = [
  { name: "Inicio", path: "/" },
  { name: "Autores", path: "/autor" },
  { name: "Libros", path: "/libros" },
];

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header routes={routes} />
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
}