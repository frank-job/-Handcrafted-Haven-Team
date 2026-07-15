// components/ProductFilter.jsx
"use client";
import { useState } from "react";

export default function ProductFilter({ categories, onFilterChange }) {
  const [selected, setSelected] = useState("All");

  const handleClick = (category) => {
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