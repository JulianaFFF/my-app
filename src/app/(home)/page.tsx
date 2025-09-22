"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-200">Bienvenidos a la biblioteca de Saiki</h1>
      {/* We use a Tailwind grid to organize the cards. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="h-8 md:h-12 lg:h-16" />
        {/* Instance 1 of the component Card */}
         <Image 
            src="/saiki.jpg"
            alt="mi gatito"
            width={500}
            height={300}
            className="rounded-lg mx-auto"
        />
      </div>

    </main>
  );
}