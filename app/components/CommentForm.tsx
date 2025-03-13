"use client";

import { useState } from "react";
import { NewComment } from "../lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, Mail } from "lucide-react";

interface CommentFormProps {
  postId: number;
  onCommentSubmit: (comment: NewComment) => void;
}

export default function CommentForm({
  postId,
  onCommentSubmit,
}: CommentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !body.trim()) {
      alert("Por favor, completa todos los campos");
      return;
    }
    setIsSubmitting(true);
    const newComment: NewComment = {
      postId,
      name,
      email,
      body,
    };

    try {
      onCommentSubmit(newComment);
      setName("");
      setEmail("");
      setBody("");
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
      alert("Ha ocurrido un error al enviar el comentario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Añadir un comentario</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium">
              Nombre
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                placeholder="Tu nombre"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="tu.email@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="body" className="block text-sm font-medium">
              Comentario
            </label>
            <Textarea
              id="body"
              value={body}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setBody(e.target.value)
              }
              rows={4}
              placeholder="Escribe tu comentario aquí..."
              required
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto ml-auto"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">Enviando...</span>
            ) : (
              <span className="flex items-center gap-2">
                <Send size={16} />
                Enviar comentario
              </span>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
