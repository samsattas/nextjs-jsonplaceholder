"use client";

import { Post } from "../lib/types";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-primary line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground line-clamp-3">{post.body}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MessageSquare size={14} />
          <span>Comentarios</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/posts/${post.id}`)}
        >
          Ver post completo
        </Button>
      </CardFooter>
    </Card>
  );
}
