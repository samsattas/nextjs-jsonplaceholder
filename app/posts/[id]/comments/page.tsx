import { getCommentsByPostId, getPostById } from "@/app/lib/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCommentsWrapper from "./PostCommentsWrapper";
import BackButton from "@/app/components/BackButton";

interface PostCommentsPageProps {
  params: {
    id: string;
  };
}

export default async function PostCommentsPage({
  params,
}: PostCommentsPageProps) {
  try {
    const postId = parseInt(params.id);

    const [post, comments] = await Promise.all([
      getPostById(postId),
      getCommentsByPostId(postId),
    ]);

    return (
      <div>
        <BackButton text="Volver al post" backRoute={`/posts/${postId}`} />

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Comentarios para: {post.title}
          </h1>
          <p className="text-gray-600">
            Esta página muestra todos los comentarios de la publicación
            seleccionada.
          </p>
        </div>

        <PostCommentsWrapper initialComments={comments} postId={postId} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching post comments:", error);
    notFound();
  }
}
