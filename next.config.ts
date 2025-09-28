import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para Docker
  output: 'standalone',
  
  // Variables de entorno públicas
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  },
  
  // Configuración de imágenes si es necesario
  images: {
    domains: ['localhost'],
  },
  
  // Ignorar errores de ESLint durante el build para Docker
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Ignorar errores de TypeScript durante el build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
