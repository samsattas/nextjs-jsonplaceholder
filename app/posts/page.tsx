import { getPosts } from "../lib/api";
import ClientWrapper from "./ClientWrapper";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Listado de Publicaciones</h1>
      <ClientWrapper initialPosts={posts} />
    </div>
  );
}
