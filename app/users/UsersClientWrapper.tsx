"use client";

import React, { useEffect, useState } from "react";
import { User } from "../lib/types";
import UserFilter from "../components/UserFilter";
import UserCard from "../components/UserCard";
import { useUsers } from "../lib/hooks";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "../components/LoadingSpinner";

export default function UsersClientWrapper() {
  const { data: users = [], isLoading, error } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleFilterChange = (query: string) => {
    if (!query.trim()) {
      setFilteredUsers(users);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.username.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery)
    );

    setFilteredUsers(filtered);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Card className="p-6 bg-red-50 border-red-200">
        <p className="text-red-500">
          Error al cargar usuarios: {error.message}
        </p>
      </Card>
    );
  }

  return (
    <>
      <UserFilter onFilterChange={handleFilterChange} />
      {filteredUsers.length === 0 ? (
        <p className="text-center py-10 text-gray-500">
          No se encontraron usuarios con ese criterio.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </>
  );
}
