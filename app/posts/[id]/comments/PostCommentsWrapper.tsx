"use client";

import CommentForm from "@/app/components/CommentForm";
import CommentList from "@/app/components/CommentList";
import { Comment, NewComment } from "@/app/lib/types";
import React, { useState } from "react";

interface PostCommentsWrapperProps {
  initialComments: Comment[];
  postId: number;
}

export default function PostCommentsWrapper({
  initialComments,
  postId,
}: PostCommentsWrapperProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleCommentSubmit = async (newComment: NewComment) => {
    try {
      const createdComment: Comment = {
        ...newComment,
        id: Math.floor(Math.random() * 1000) + 1000,
      };
      setComments([createdComment, ...comments]);
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  };

  return (
    <div>
      <div className="bg-gray-50 p-4 mb-6 rounded-lg border border-gray-200">
        <p className="text-gray-700 font-medium">
          Total de comentarios: {comments.length}
        </p>
      </div>

      <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} />
      <CommentList comments={comments} />
    </div>
  );
}
