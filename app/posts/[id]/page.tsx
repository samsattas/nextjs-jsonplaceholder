import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCommentsByPostId, getPostById, getUserById } from "../../lib/api";
import CommentsClientWrapper from "./CommentsClientWrapper";
import BackButton from "@/app/components/BackButton";

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  try {
    const postId = parseInt(params.id);

    const [post, comments] = await Promise.all([
      getPostById(postId),
      getCommentsByPostId(postId),
    ]);

    const author = await getUserById(post.userId);

    return (
      <div>
        <BackButton text="Volver a publicaciones" backRoute="/posts" />

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          <Link
            href={`/users/${author.id}`}
            className="block mb-4 text-gray-400 hover:underline"
          >
            Por: {author.name} (@{author.username})
          </Link>

          <div className="mt-4 text-lg">
            <p className="whitespace-pre-line">{post.body}</p>
          </div>

          <div className="pt-6 flex justify-end">
            <Link
              href={`/posts/${post.id}/comments`}
              className=" px-4 py-2 bg-black text-white hover:opacity-80 rounded-md font-medium transition-colors w-fit flex gap-2"
            >
              Ver todos los comentarios
              <ArrowRight className="w-6 h-6 stroke-white" />
            </Link>
          </div>
        </div>

        <CommentsClientWrapper initialComments={comments} postId={postId} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}
