"use client";

import React, { useState } from "react";
import { Comment, NewComment } from "../../lib/types";
import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";

interface CommentsClientWrapperProps {
  initialComments: Comment[];
  postId: number;
}

export default function CommentsClientWrapper({
  initialComments,
  postId,
}: CommentsClientWrapperProps) {
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
      <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} />
      <CommentList comments={comments} />
    </div>
  );
}
