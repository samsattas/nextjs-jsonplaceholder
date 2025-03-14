"use client";

import Link from "next/link";
import {
  usePost,
  useUser,
  useComments,
  useCreateComment,
} from "../../lib/hooks";
import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";
import { NewComment } from "../../lib/types";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/app/components/BackButton";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface PostDetailWrapperProps {
  postId: number;
}

export default function PostDetailWrapper({ postId }: PostDetailWrapperProps) {
  const {
    data: post,
    isLoading: isLoadingPost,
    error: postError,
  } = usePost(postId);

  const {
    data: comments = [],
    isLoading: isLoadingComments,
    error: commentsError,
  } = useComments(postId);

  const {
    data: author,
    isLoading: isLoadingAuthor,
    error: authorError,
  } = useUser(post?.userId || 0);

  const createCommentMutation = useCreateComment();

  const handleCommentSubmit = async (newComment: NewComment) => {
    try {
      await createCommentMutation.mutateAsync(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  };

  if (isLoadingPost || isLoadingComments || (post && isLoadingAuthor)) {
    return <LoadingSpinner />;
  }

  if (postError || commentsError || authorError) {
    return (
      <Card className="p-6 bg-red-50 border-red-200">
        <p className="text-red-500">
          Error:{" "}
          {postError?.message || commentsError?.message || authorError?.message}
        </p>
        <Link href="/posts">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a publicaciones
          </Button>
        </Link>
      </Card>
    );
  }

  if (!post) {
    return (
      <Card className="p-6">
        <p className="text-gray-500">No se encontró la publicación.</p>
        <Link href="/posts">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a publicaciones
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div>
      <BackButton text="Volver a publicaciones" backRoute="/posts" />

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <Link
          href={`/users/${author?.id}`}
          className="block mb-4 text-gray-400 hover:underline"
        >
          Por: {author?.name} (@{author?.username})
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

      <div>
        <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} />
        <CommentList comments={comments} />
      </div>
    </div>
  );
}
