"use client";

import Link from "next/link";
import { usePost, useComments, useCreateComment } from "../../../lib/hooks";
import CommentList from "../../../components/CommentList";
import CommentForm from "../../../components/CommentForm";
import { NewComment } from "../../../lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare } from "lucide-react";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface CommentsWrapperProps {
  postId: number;
}

export default function CommentsWrapper({ postId }: CommentsWrapperProps) {
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

  const createCommentMutation = useCreateComment();

  const handleCommentSubmit = async (newComment: NewComment) => {
    try {
      await createCommentMutation.mutateAsync(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  };

  if (isLoadingPost || isLoadingComments) {
    return <LoadingSpinner />;
  }

  if (postError || commentsError) {
    return (
      <Card className="p-6 bg-red-50 border-red-200">
        <p className="text-red-500">
          Error: {postError?.message || commentsError?.message}
        </p>
        <Link href={`/posts/${postId}`}>
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al post
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
      <Link href={`/posts/${postId}`} className="inline-block mb-6">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al post
        </Button>
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Comentarios para: {post.title}
        </h1>
        <p className="text-gray-600">
          Esta página muestra todos los comentarios de la publicación
          seleccionada.
        </p>
      </div>

      <div className="bg-gray-50 p-4 mb-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-primary" />
          <p className="text-gray-700 font-medium">
            Total de comentarios: {comments.length}
          </p>
        </div>
      </div>

      <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} />
      <CommentList comments={comments} />
    </div>
  );
}
