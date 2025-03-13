"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SortAsc, SortDesc } from "lucide-react";

interface PostFilterProps {
  onFilterChange: (query: string) => void;
  onSortChange: (sortAsc: boolean) => void;
}

export default function PostFilter({
  onFilterChange,
  onSortChange,
}: PostFilterProps) {
  const [filterValue, setFilterValue] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFilterValue(newValue);
    onFilterChange(newValue);
  };

  const handleSortChange = () => {
    const newSortValue = !sortAsc;
    setSortAsc(newSortValue);
    onSortChange(newSortValue);
  };

  return (
    <div className="mb-6 space-y-4">
      <div>
        <label htmlFor="post-filter" className="block text-sm font-medium mb-1">
          Filtrar por título
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="post-filter"
            type="text"
            placeholder="Buscar publicaciones..."
            value={filterValue}
            onChange={handleFilterChange}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center">
        <Button
          onClick={handleSortChange}
          variant="outline"
          className="flex items-center gap-2"
        >
          <span>Ordenar por título</span>
          {sortAsc ? <SortAsc size={16} /> : <SortDesc size={16} />}
        </Button>
      </div>
    </div>
  );
}
