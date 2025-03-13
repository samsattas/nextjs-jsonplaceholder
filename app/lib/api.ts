import { User, Post, Comment } from "./types";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Función para obtener todos los usuarios.
 */
export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

/**
 * Función para obtener un usuario por ID.
 */
export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID: ${id}`);
  }
  return response.json();
}

/**
 * Función para obtener todos los posts.
 */
export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

/**
 * Función para obtener un post por ID.
 */
export async function getPostById(id: number): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post with ID: ${id}`);
  }
  return response.json();
}

/**
 * Función para obtener los posts de un usuario específico.
 */
export async function getPostsByUserId(userId: number): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts for user ID: ${userId}`);
  }
  return response.json();
}

/**
 * Función para obtener los comentarios de un post.
 */
export async function getCommentsByPostId(postId: number): Promise<Comment[]> {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error(`Failed to fetch comments for post ID: ${postId}`);
  }
  return response.json();
}

/**
 * Función para crear un comentario (simula un POST).
 * Nota: JSONPlaceholder no guarda realmente los datos,
 * solo se simula una interacción que tendria una app similar
 */
export async function createComment(
  postId: number,
  name: string,
  email: string,
  body: string
): Promise<Comment> {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create comment");
  }

  return response.json();
}
