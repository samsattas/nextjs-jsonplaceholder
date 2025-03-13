"use client";

import React, { useState } from "react";
import { User } from "../lib/types";
import UserFilter from "../components/UserFilter";
import UserCard from "../components/UserCard";

interface UsersClientWrapperProps {
  initialUsers: User[];
}

export default function UsersClientWrapper({
  initialUsers,
}: UsersClientWrapperProps) {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);

  const handleFilterChange = (query: string) => {
    if (!query.trim()) {
      setFilteredUsers(initialUsers);
      return;
    }
    const lowercaseQuery = query.toLowerCase();
    const filtered = initialUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.username.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredUsers(filtered);
  };

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
