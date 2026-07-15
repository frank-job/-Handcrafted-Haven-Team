// components/ProductGrid.jsx
"use client";
import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";

interface Product {
  _id: string;
  product_name: string;
  product_image: string;
  price: number;
  category: string;
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Get unique categories from the product list
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  // Filter products based on selected category
  const filtered = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <div>
      <ProductFilter categories={categories} onFilterChange={setActiveCategory} />

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}