export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1–5
  body: string;
  createdAt: string;
}

let reviews: Review[] = [];
let nextId = 1;

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export interface ReviewInput {
  author: string;
  rating: number;
  body: string;
}

export function validateReviewInput(input: Partial<ReviewInput>): string[] {
  const errors: string[] = [];

  if (!input.author?.trim()) errors.push("author is required.");
  if (!input.body?.trim()) errors.push("review text is required.");

  if (
    typeof input.rating !== "number" ||
    !Number.isInteger(input.rating) ||
    input.rating < 1 ||
    input.rating > 5
  ) {
    errors.push("rating must be a whole number between 1 and 5.");
  }

  return errors;
}

export function createReview(productId: string, input: ReviewInput): Review {
  const review: Review = {
    id: String(nextId++),
    productId,
    author: input.author.trim(),
    rating: input.rating,
    body: input.body.trim(),
    createdAt: new Date().toISOString(),
  };

  reviews.push(review);
  return review;
}
