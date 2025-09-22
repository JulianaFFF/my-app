"use client"; 
import "./globals.css";
import Notification from "@/shared/ui/Notification";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <Notification />
        {children}  
      </body>
    </html>
  );
}