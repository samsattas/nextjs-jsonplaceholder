import PostDetailWrapper from "./PostDetailWrapper";

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const postId = parseInt(params.id);

  return <PostDetailWrapper postId={postId} />;
}
