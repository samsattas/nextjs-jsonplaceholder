"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface UserFilterProps {
  onFilterChange: (query: string) => void;
}

export default function UserFilter({ onFilterChange }: UserFilterProps) {
  const [filterValue, setFilterValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFilterValue(newValue);
    onFilterChange(newValue);
  };

  return (
    <div className="mb-6 relative">
      <label htmlFor="user-filter" className="block text-sm font-medium mb-1">
        Filtrar por nombre o usuario
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          id="user-filter"
          type="text"
          placeholder="Buscar usuarios..."
          value={filterValue}
          onChange={handleChange}
          className="pl-10"
        />
      </div>
    </div>
  );
}
