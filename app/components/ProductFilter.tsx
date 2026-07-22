// components/ProductFilter.jsx
"use client";
import { useState } from "react";

interface ProductFilterProps {
  categories: string[];
  onFilterChange?: (category: string) => void;
  onSortChange?: (sort: string) => void;
  onSearchChange?: (search: string) => void;
}

export default function ProductFilter({
  categories,
  onFilterChange,
  onSortChange,
  onSearchChange,
}: ProductFilterProps) {
  const [selected, setSelected] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [selectedSort, setSelectedSort] = useState("featured");

  const handleClick = (category: string) => {
    setSelected(category);
    onFilterChange?.(category);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    onSearchChange?.(value);
  };

  const handleSort = (value: string) => {
    setSelectedSort(value);
    onSortChange?.(value);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search products"
          className="w-full sm:flex-1 border border-black/20 bg-white px-4 py-2 text-sm outline-none transition-colors focus:border-black"
        />

        <select
          value={selectedSort}
          onChange={(e) => handleSort(e.target.value)}
          className="w-full sm:w-56 border border-black/20 bg-white px-4 py-2 text-sm outline-none transition-colors focus:border-black"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            onClick={() => handleClick(category)}
            className={`px-4 py-2 text-sm border transition-colors ${
              selected === category
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black/20 hover:border-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}