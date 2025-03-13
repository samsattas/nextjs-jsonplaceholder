import { Send, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">
        Bienvenido a JSONPlaceholder App
      </h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Esta aplicación muestra cómo trabajar con datos de JSONPlaceholder
        utilizando Next.js 14, React 18 y TypeScript con Server Components.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/users">
          <div className="bg-black hover:opacity-90 text-white font-bold p-6 rounded shadow-lg transition-all hover:scale-105 flex items-center gap-4">
            <Users className="stroke-white w-12 h-12" />
            <div>
              <h2 className="text-2xl mb-2">Usuarios</h2>
              <p>Ver listado de usuarios y sus detalles</p>
            </div>
          </div>
        </Link>

        <Link href="/posts">
          <div className="bg-black hover:opacity-90 text-white font-bold p-6 rounded shadow-lg transition-all hover:scale-105 flex items-center gap-4">
            <Send className="stroke-white fill-none w-12 h-12" />
            <div>
              <h2 className="text-2xl mb-2">Publicaciones</h2>
              <p>Ver publicaciones y sus comentarios</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
