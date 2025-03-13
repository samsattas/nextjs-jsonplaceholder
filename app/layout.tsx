import { Home, Send, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "JSONPlaceholder App",
  description:
    "Una aplicación que consume datos de JSONPlaceholder con Next.js 14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz@9..40&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white min-h-screen max-h-screen flex flex-col items-center justify-between">
        <header className="bg-gray-100 p-4 w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">JSONPlaceholder App</h1>
            <nav>
              <ul className="flex gap-6 font-medium">
                <li>
                  <Link href="/" className="flex items-center gap-1">
                    <Home className="w-6 h-6 stroke-black " />
                    <div className="hidden md:block">Inicio</div>
                  </Link>
                </li>
                <li>
                  <Link href="/users" className="flex items-center gap-1">
                    <Users className="w-6 h-6 fill-none stroke-black " />
                    <div className="hidden md:block">Usuarios</div>
                  </Link>
                </li>
                <li>
                  <Link href="/posts" className="flex items-center gap-1">
                    <Send className="w-6 h-6 stroke-black " />
                    <div className="hidden md:block">Publicaciones</div>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="w-full p-8 md:p-12 lg:p-20 xl:p-28">{children}</main>
        <footer className="bg-gray-100  p-4 w-full">
          <div className="text-center">
            <p>© 2025 JSONPlaceholder App - Creado con Next.js 14</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
