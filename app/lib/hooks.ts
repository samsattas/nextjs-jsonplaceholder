import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  getCommentsByPostId,
  getPostById,
  getPosts,
  getPostsByUserId,
  getUserById,
  getUsers,
} from "./api";
import { Comment, NewComment } from "./types";

// Hook para obtener todos los usuarios
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

// Hook para obtener un usuario por ID
export function useUser(id: number) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
}

// Hook para obtener todos los posts
export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
}

// Hook para obtener un post por ID
export function usePost(id: number) {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
}

// Hook para obtener posts por usuario
export function usePostsByUser(userId: number) {
  return useQuery({
    queryKey: ["posts", "byUser", userId],
    queryFn: () => getPostsByUserId(userId),
    enabled: !!userId,
  });
}

// Hook para obtener comentarios de un post
export function useComments(postId: number) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPostId(postId),
    enabled: !!postId,
  });
}

// Hook para crear un nuevo comentario
export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, name, email, body }: NewComment) =>
      createComment(postId, name, email, body),
    onSuccess: (newComment, variables) => {
      // Actualizar la caché de comentarios después de crear uno nuevo
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });

      // Opcionalmente, también podemos actualizar la caché directamente
      queryClient.setQueryData<Comment[]>(
        ["comments", variables.postId],
        (oldData = []) => [newComment, ...oldData]
      );
    },
  });
}
