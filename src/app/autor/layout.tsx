import React from "react";
import Header from "@/shared/ui/Header";
import Footer from "@/shared/ui/Footer";

export default function AutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const routesAutor = [
    { name: "Inicio", path: "/" },
    { name: "Autores", path: "/autor" },
    { name: "Crear Autores", path: "/autor/crear" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header routes={routesAutor} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}