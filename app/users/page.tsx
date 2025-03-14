import UsersClientWrapper from "./UsersClientWrapper";

export default async function UsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Listado de Usuarios</h1>
      <UsersClientWrapper />
    </div>
  );
}
