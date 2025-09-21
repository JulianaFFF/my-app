// src/app/layout.tsx
"use client"; 
import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        {children}  {/* Cada sección maneja su propio header/footer */}
      </body>
    </html>
  );
}