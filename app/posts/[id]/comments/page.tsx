import PostCommentsWrapper from "./PostCommentsWrapper";

interface PostCommentsPageProps {
  params: {
    id: string;
  };
}

export default function PostCommentsPage({ params }: PostCommentsPageProps) {
  const postId = parseInt(params.id);

  return <PostCommentsWrapper postId={postId} />;
}
