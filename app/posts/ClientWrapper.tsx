"use client";

import React, { useState, useEffect } from "react";
import { Post } from "../lib/types";
import PostFilter from "../components/PostFilter";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 10;

export default function ClientWrapper({
  initialPosts,
}: {
  initialPosts: Post[];
}) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialPosts.length / ITEMS_PER_PAGE)
  );

  const handleFilterChange = (query: string) => {
    setFilterQuery(query);
    setCurrentPage(1);
    applyFilters(query, sortAsc);
  };

  const handleSortChange = (newSortAsc: boolean) => {
    setSortAsc(newSortAsc);
    applyFilters(filterQuery, newSortAsc);
  };

  const applyFilters = (query: string, isAscending: boolean) => {
    let result = [...initialPosts];

    if (query.trim()) {
      const lowercaseQuery = query.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(lowercaseQuery) ||
          post.body.toLowerCase().includes(lowercaseQuery)
      );
    }

    result.sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return isAscending ? comparison : -comparison;
    });

    setFilteredPosts(result);
    setTotalPages(Math.ceil(result.length / ITEMS_PER_PAGE));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedPosts(filteredPosts.slice(startIndex, endIndex));
  }, [filteredPosts, currentPage]);

  return (
    <>
      <PostFilter
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      {filteredPosts.length === 0 ? (
        <p className="text-center py-10 text-gray-500">
          No se encontraron publicaciones con ese criterio.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}
