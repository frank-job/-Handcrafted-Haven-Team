import { sql } from "@vercel/postgres";
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
  seller_id: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductQuery {
  category?: string;
  search?: string;
  sort?: ProductSort;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: string;
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
type ProductRow = {
  id: number;
  product_name: string;
  product_image: string;
  product_description: string | null;
  price: number | string;
  category: string;
  seller_id: string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

let ensureSeedPromise: Promise<void> | null = null;

function toProduct(row: ProductRow): Product {
  return {
    _id: String(row.id),
    product_name: row.product_name,
    product_image: row.product_image,
    product_description: row.product_description ?? "",
    price: Number(row.price),
    category: row.category,
    seller_id: row.seller_id,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

function mapSortToSql(sort: ProductSort): string {
  switch (sort) {
    case "price-low":
      return "price ASC, id ASC";
    case "price-high":
      return "price DESC, id ASC";
    case "name-asc":
      return "product_name ASC, id ASC";
    case "name-desc":
      return "product_name DESC, id ASC";
    case "newest":
      return "created_at DESC, id DESC";
    case "featured":
    default:
      return "id ASC";
  }
}

async function ensureProductsSeeded() {
  if (!ensureSeedPromise) {
    ensureSeedPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS products (
          id BIGSERIAL PRIMARY KEY,
          seed_key TEXT,
          product_name TEXT NOT NULL,
          product_image TEXT NOT NULL,
          product_description TEXT DEFAULT '',
          price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
          category TEXT NOT NULL,
          seller_id TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS seed_key TEXT`;
      await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS seller_id TEXT`;
      await sql`ALTER TABLE products ALTER COLUMN seller_id TYPE TEXT USING seller_id::text`;

      await sql`CREATE INDEX IF NOT EXISTS idx_products_category ON products (category)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_products_created_at ON products (created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products (seller_id)`;
      await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_products_seed_key_unique ON products (seed_key)`;

      for (const item of typedSeedProducts) {
        await sql`
          INSERT INTO products (seed_key, product_name, product_image, product_description, price, category)
          VALUES (
            ${`seed:${item._id}`},
            ${item.product_name},
            ${item.product_image},
            ${item.product_description ?? ""},
            ${item.price},
            ${item.category}
          )
          ON CONFLICT (seed_key) DO NOTHING
        `;
      }

      await sql`
        DELETE FROM products AS legacy
        USING products AS seeded
        WHERE seeded.seed_key IS NOT NULL
          AND legacy.seed_key IS NULL
          AND legacy.product_name = seeded.product_name
          AND legacy.product_image = seeded.product_image
          AND legacy.product_description = seeded.product_description
          AND legacy.price = seeded.price
          AND legacy.category = seeded.category
      `;
    })();
  }

  await ensureSeedPromise;
}

export async function listProducts(query: ProductQuery = {}) {
  const {
    category,
    search,
    sort = "featured",
    minPrice,
    maxPrice,
    sellerId,
    page = 1,
    limit = 20,
  } = query;

  const normalizedCategory = category?.trim();
  const normalizedSearch = search?.trim().toLowerCase();

  await ensureProductsSeeded();

  const safeLimit = Math.max(1, Math.min(100, limit));
  const safePage = Math.max(1, page);
  const offset = (safePage - 1) * safeLimit;

  const whereClauses: string[] = [];
  const values: Array<string | number> = [];
  let parameterIndex = 1;

  if (normalizedCategory && normalizedCategory.toLowerCase() !== "all") {
    whereClauses.push(`LOWER(category) = LOWER($${parameterIndex})`);
    values.push(normalizedCategory);
    parameterIndex += 1;
  }

  if (normalizedSearch) {
    whereClauses.push(
      `(product_name ILIKE $${parameterIndex} OR product_description ILIKE $${parameterIndex})`,
    );
    values.push(`%${normalizedSearch}%`);
    parameterIndex += 1;
  }

  if (typeof minPrice === "number") {
    whereClauses.push(`price >= $${parameterIndex}`);
    values.push(minPrice);
    parameterIndex += 1;
  }

  if (typeof maxPrice === "number") {
    whereClauses.push(`price <= $${parameterIndex}`);
    values.push(maxPrice);
    parameterIndex += 1;
  }

  if (sellerId) {
    whereClauses.push(`seller_id = $${parameterIndex}`);
    values.push(sellerId);
    parameterIndex += 1;
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";
  const orderBySql = mapSortToSql(sort);

  const countResult = await sql.query<{ total: string }>(
    `SELECT COUNT(*)::text AS total FROM products ${whereSql}`,
    values,
  );
  const total = Number(countResult.rows[0]?.total ?? "0");

  const dataResult = await sql.query<ProductRow>(
    `
      SELECT id, product_name, product_image, product_description, price, category, seller_id, created_at, updated_at
      FROM products
      ${whereSql}
      ORDER BY ${orderBySql}
      LIMIT $${parameterIndex} OFFSET $${parameterIndex + 1}
    `,
    [...values, safeLimit, offset],
  );
  const data = dataResult.rows.map(toProduct);

  return {
    data,
    meta: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
    },
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  await ensureProductsSeeded();

  const result = await sql<ProductRow>`
    SELECT id, product_name, product_image, product_description, price, category, seller_id, created_at, updated_at
    FROM products
    WHERE id = ${id}
    LIMIT 1
  `;

  if (result.rows.length === 0) return null;
  return toProduct(result.rows[0]);
}

export interface ProductInput {
  product_name: string;
  product_image: string;
  product_description?: string;
  price: number;
  category: string;
}

export async function createProduct(input: ProductInput, sellerId: string): Promise<Product> {
  await ensureProductsSeeded();

  const result = await sql<ProductRow>`
    INSERT INTO products (product_name, product_image, product_description, price, category, seller_id)
    VALUES (
      ${input.product_name},
      ${input.product_image},
      ${input.product_description ?? ""},
      ${input.price},
      ${input.category},
      ${sellerId}
    )
    RETURNING id, product_name, product_image, product_description, price, category, seller_id, created_at, updated_at
  `;

  return toProduct(result.rows[0]);
}

export async function listProductsBySeller(sellerId: string): Promise<Product[]> {
  const { data } = await listProducts({ sellerId, sort: "newest", limit: 200 });
  return data;
}

export async function updateProductBySeller(
  id: string,
  sellerId: string,
  updates: Partial<ProductInput>,
): Promise<Product | null> {
  await ensureProductsSeeded();

  const setClauses: string[] = [];
  const values: Array<string | number> = [];

  if (updates.product_name !== undefined) {
    values.push(updates.product_name);
    setClauses.push(`product_name = $${values.length}`);
  }

  if (updates.product_image !== undefined) {
    values.push(updates.product_image);
    setClauses.push(`product_image = $${values.length}`);
  }

  if (updates.product_description !== undefined) {
    values.push(updates.product_description);
    setClauses.push(`product_description = $${values.length}`);
  }

  if (updates.price !== undefined) {
    values.push(updates.price);
    setClauses.push(`price = $${values.length}`);
  }

  if (updates.category !== undefined) {
    values.push(updates.category);
    setClauses.push(`category = $${values.length}`);
  }

  if (setClauses.length === 0) {
    const unchanged = await sql<ProductRow>`
      SELECT id, product_name, product_image, product_description, price, category, seller_id, created_at, updated_at
      FROM products
      WHERE id = ${id} AND seller_id = ${sellerId}
      LIMIT 1
    `;

    if (unchanged.rows.length === 0) return null;
    return toProduct(unchanged.rows[0]);
  }

  values.push(id);

  const result = await sql.query<ProductRow>(
    `
      UPDATE products
      SET ${setClauses.join(", ")}, updated_at = NOW()
      WHERE id = $${values.length} AND seller_id = $${values.length + 1}
      RETURNING id, product_name, product_image, product_description, price, category, seller_id, created_at, updated_at
    `,
    [...values, sellerId],
  );

  if (result.rows.length === 0) return null;
  return toProduct(result.rows[0]);
}

export async function deleteProductBySeller(id: string, sellerId: string): Promise<boolean> {
  await ensureProductsSeeded();
  const result = await sql`DELETE FROM products WHERE id = ${id} AND seller_id = ${sellerId}`;
  return (result.rowCount ?? 0) > 0;
}
