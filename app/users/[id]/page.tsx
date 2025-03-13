import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "../../components/PostCard";
import { getPostsByUserId, getUserById } from "../../lib/api";
import BackButton from "@/app/components/BackButton";

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  try {
    const userId = parseInt(params.id);

    const [user, userPosts] = await Promise.all([
      getUserById(userId),
      getPostsByUserId(userId),
    ]);

    return (
      <div className="flex flex-col gap-8">
        <BackButton text="Volver a usuarios" backRoute="/users" />
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <div className="w-full border-t border-gray-200" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Información de contacto
              </h2>
              <ul className="space-y-2">
                <li>
                  <strong>Username:</strong> @{user.username}
                </li>
                <li>
                  <strong>Email:</strong> {user.email}
                </li>
                <li>
                  <strong>Teléfono:</strong> {user.phone}
                </li>
                <li>
                  <strong>Website:</strong>{" "}
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {user.website}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Dirección</h2>
              <ul className="space-y-2">
                <li>
                  <strong>Calle:</strong> {user.address.street}
                </li>
                <li>
                  <strong>Suite:</strong> {user.address.suite}
                </li>
                <li>
                  <strong>Ciudad:</strong> {user.address.city}
                </li>
                <li>
                  <strong>Código Postal:</strong> {user.address.zipcode}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Empresa</h2>
            <ul className="space-y-2">
              <li>
                <strong>Nombre:</strong> {user.company.name}
              </li>
              <li>
                <strong>Eslogan:</strong> "{user.company.catchPhrase}"
              </li>
              <li>
                <strong>BS:</strong> {user.company.bs}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Publicaciones del usuario</h2>

          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Este usuario no tiene publicaciones.
            </p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    notFound();
  }
}
