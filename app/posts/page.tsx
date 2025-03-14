import ClientWrapper from "./ClientWrapper";

export default async function PostsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Listado de Publicaciones</h1>
      <ClientWrapper />
    </div>
  );
}
