// components/ProductFilter.jsx
"use client";
import { useState } from "react";

interface ProductFilterProps {
  categories: string[];
  onFilterChange?: (category: string) => void;
}

export default function ProductFilter({ categories, onFilterChange }: ProductFilterProps) {
  const [selected, setSelected] = useState("All");

  const handleClick = (category: string) => {
    setSelected(category);
    onFilterChange?.(category);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
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
  );
}