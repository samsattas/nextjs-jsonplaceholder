import UserDetailWrapper from "./UserDetailWrapper";

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const userId = parseInt(params.id);

  return <UserDetailWrapper userId={userId} />;
}
