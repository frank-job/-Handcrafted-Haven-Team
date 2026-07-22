import { products as seedProducts } from "@/lib/dummyProducts";

export type ProductSort =
  | "featured"
  | "price-low"
  | "price-high"
  | "name-asc"
  | "name-desc"
  | "newest";

export interface Product {
  _id: string;
  product_name: string;
  product_image: string;
  product_description: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductQuery {
  category?: string;
  search?: string;
  sort?: ProductSort;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

interface SeedProduct {
  _id: string;
  product_name: string;
  product_image: string;
  product_description?: string;
  price: number;
  category: string;
}

const typedSeedProducts = seedProducts as SeedProduct[];

let products: Product[] = typedSeedProducts.map((item, index) => {
  const createdDate = new Date(Date.now() - (typedSeedProducts.length - index) * 60_000).toISOString();

  return {
    _id: item._id,
    product_name: item.product_name,
    product_image: item.product_image,
    product_description: item.product_description ?? "",
    price: item.price,
    category: item.category,
    createdAt: createdDate,
    updatedAt: createdDate,
  };
});

let nextId =
  products.reduce((max, product) => {
    const value = Number(product._id);
    return Number.isFinite(value) ? Math.max(max, value) : max;
  }, 0) + 1;

function sortProducts(items: Product[], sort: ProductSort): Product[] {
  const sorted = [...items];

  switch (sort) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      sorted.sort((a, b) => a.product_name.localeCompare(b.product_name));
      break;
    case "name-desc":
      sorted.sort((a, b) => b.product_name.localeCompare(a.product_name));
      break;
    case "newest":
      sorted.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      break;
    default:
      break;
  }

  return sorted;
}

export function listProducts(query: ProductQuery = {}) {
  const {
    category,
    search,
    sort = "featured",
    minPrice,
    maxPrice,
    page = 1,
    limit = 20,
  } = query;

  const normalizedCategory = category?.trim();
  const normalizedSearch = search?.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesCategory =
      !normalizedCategory ||
      normalizedCategory.toLowerCase() === "all" ||
      product.category.toLowerCase() === normalizedCategory.toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      product.product_name.toLowerCase().includes(normalizedSearch) ||
      product.product_description.toLowerCase().includes(normalizedSearch);

    const matchesMin = typeof minPrice !== "number" || product.price >= minPrice;
    const matchesMax = typeof maxPrice !== "number" || product.price <= maxPrice;

    return matchesCategory && matchesSearch && matchesMin && matchesMax;
  });

  const sorted = sortProducts(filtered, sort);

  const safeLimit = Math.max(1, Math.min(100, limit));
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const data = sorted.slice(start, start + safeLimit);

  return {
    data,
    meta: {
      total: sorted.length,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.max(1, Math.ceil(sorted.length / safeLimit)),
    },
  };
}

export function getProductById(id: string): Product | null {
  return products.find((product) => product._id === id) ?? null;
}

export interface ProductInput {
  product_name: string;
  product_image: string;
  product_description?: string;
  price: number;
  category: string;
}

export function createProduct(input: ProductInput): Product {
  const now = new Date().toISOString();

  const product: Product = {
    _id: String(nextId++),
    product_name: input.product_name,
    product_image: input.product_image,
    product_description: input.product_description ?? "",
    price: input.price,
    category: input.category,
    createdAt: now,
    updatedAt: now,
  };

  products.push(product);
  return product;
}

export function updateProduct(id: string, updates: Partial<ProductInput>): Product | null {
  const index = products.findIndex((item) => item._id === id);
  if (index === -1) return null;

  const current = products[index];
  const updated: Product = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  products[index] = updated;
  return updated;
}

export function deleteProduct(id: string): boolean {
  const before = products.length;
  products = products.filter((product) => product._id !== id);
  return products.length < before;
}
