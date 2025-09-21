"use client";
import Card from "@/components/Card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Explora nuevos contenidos</h1>
      {/* We use a Tailwind grid to organize the cards. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="h-8 md:h-12 lg:h-16" />
        {/* Instance 1 of the component Card */}
        <Card
          title="Explorando React"
          description="Una introducción profunda a la librería de UI más popular del mundo."
          imageUrl="/libro.jpg" // Asumimos que esta imagen está en public/images/
        />

        {/* Instance 2 of the component Card */}
        <Card
          title="El Poder de Next.js"
          description="Descubre por qué Next.js es el framework de elección para aplicaciones de producción."
          imageUrl="/libro.jpg"
        />

        {/* Instance 3 of the component Card */}
        <Card
          title="La Seguridad de TypeScript"
          description="Añade un sistema de tipos a tu JavaScript para construir aplicaciones más robustas."
          imageUrl="/libro.jpg"
        />

      </div>

    </main>
  );
}