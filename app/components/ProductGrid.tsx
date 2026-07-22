// components/ProductGrid.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";

interface Product {
  _id: string;
  product_name: string;
  product_image: string;
  product_description?: string;
  price: number;
  category: string;
}

interface ProductListResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Keep categories stable while users browse filtered data.
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const categories = useMemo(
    () => [...new Set(allCategories)],
    [allCategories]
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      try {
        const response = await fetch("/api/products?limit=100", {
          signal: controller.signal,
        });

        if (!response.ok) return;

        const payload = (await response.json()) as ProductListResponse;
        const extracted = [...new Set(payload.data.map((item) => item.category))];
        setAllCategories(extracted);
      } catch {
        // Category list can gracefully fail without breaking the page.
      }
    }

    loadCategories();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();
        params.set("limit", "100");

        if (activeCategory !== "All") {
          params.set("category", activeCategory);
        }

        if (searchQuery.trim()) {
          params.set("search", searchQuery.trim());
        }

        params.set("sort", sortBy);

        const response = await fetch(`/api/products?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load products.");
        }

        const payload = (await response.json()) as ProductListResponse;
        setProducts(payload.data);
      } catch {
        if (!controller.signal.aborted) {
          setError("Unable to load products right now.");
          setProducts([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <div>
      <ProductFilter
        categories={categories}
        onFilterChange={setActiveCategory}
        onSortChange={setSortBy}
        onSearchChange={setSearchQuery}
      />

      {loading ? (
        <p className="text-gray-500 text-center py-12">Loading products...</p>
      ) : error ? (
        <p className="text-red-600 text-center py-12">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No products found.</p>
      ) : (
        <>
          <p className="mb-6 text-sm text-gray-600">
            Showing {products.length} item{products.length === 1 ? "" : "s"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}