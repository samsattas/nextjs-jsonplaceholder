import { Comment } from "../lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, User, Mail } from "lucide-react";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MessageSquare size={20} className="text-primary" />
        Comentarios ({comments.length})
      </h3>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-primary" />
                  <h4 className="font-medium">{comment.name}</h4>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={14} />
                  <span className="text-sm">{comment.email}</span>
                </div>
              </div>
              <p className="text-muted-foreground mt-2">{comment.body}</p>
            </CardContent>
          </Card>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-10">
            <MessageSquare
              size={40}
              className="mx-auto text-muted-foreground mb-2 opacity-40"
            />
            <p className="text-muted-foreground italic">
              No hay comentarios para esta publicación.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
