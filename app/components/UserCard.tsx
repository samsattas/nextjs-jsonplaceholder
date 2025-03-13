import { User } from "../lib/types";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Globe, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const router = useRouter();

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-primary">{user.name}</CardTitle>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <UserIcon size={14} />@{user.username}
        </p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <Mail size={16} className="text-muted-foreground" />
            {user.email}
          </p>
          <p className="flex items-center gap-2">
            <Globe size={16} className="text-muted-foreground" />
            {user.website}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/users/${user.id}`)}
        >
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  );
}
