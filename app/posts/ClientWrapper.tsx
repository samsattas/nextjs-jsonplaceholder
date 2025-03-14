"use client";

import React, { useState, useEffect } from "react";
import { Post } from "../lib/types";
import PostFilter from "../components/PostFilter";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { usePosts } from "../lib/hooks";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "../components/LoadingSpinner";

const ITEMS_PER_PAGE = 10;

export default function ClientWrapper() {
  const { data: initialPosts = [], isLoading, error } = usePosts();

  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (initialPosts.length > 0) {
      applyFilters(filterQuery, sortAsc, initialPosts);
    }
  }, [initialPosts]);

  const handleFilterChange = (query: string) => {
    setFilterQuery(query);
    setCurrentPage(1);
    applyFilters(query, sortAsc, initialPosts);
  };

  const handleSortChange = (newSortAsc: boolean) => {
    setSortAsc(newSortAsc);
    applyFilters(filterQuery, newSortAsc, initialPosts);
  };

  const applyFilters = (query: string, isAscending: boolean, posts: Post[]) => {
    let result = [...posts];

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Card className="p-6 bg-red-50 border-red-200">
        <p className="text-red-500">
          Error al cargar publicaciones: {error.message}
        </p>
      </Card>
    );
  }

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
