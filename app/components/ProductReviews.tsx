"use client";

import { useEffect, useState } from "react";

interface Review {
  id: string;
  author: string;
  rating: number;
  body: string;
  createdAt: string;
}

function StarRating({
  value,
  interactive,
  onChange,
}: {
  value: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={`text-2xl leading-none transition-colors ${
            interactive ? "cursor-pointer" : "cursor-default"
          } ${star <= (hovered || value) ? "text-yellow-400" : "text-gray-300"}`}
          aria-label={interactive ? `Rate ${star} out of 5` : undefined}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${productId}/reviews`)
      .then((r) => r.json())
      .then((payload) => setReviews(payload.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [productId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, rating, body }),
      });

      const payload = await res.json();

      if (!res.ok) {
        setError(payload.details?.join(" ") ?? payload.error ?? "Something went wrong.");
        return;
      }

      setReviews((prev) => [payload.data, ...prev]);
      setAuthor("");
      setRating(0);
      setBody("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Unable to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

  return (
    <section className="mt-16 border-t border-black/10 pt-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Customer Reviews</h2>

      {avgRating !== null && (
        <div className="flex items-center gap-3 mb-8">
          <StarRating value={Math.round(avgRating)} />
          <span className="text-sm text-gray-500">
            {avgRating.toFixed(1)} out of 5 &mdash; {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Submit form */}
      <div className="mb-10 border border-black/10 p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Your name</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              placeholder="e.g. Jane"
              className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Rating</label>
            <StarRating value={rating} interactive onChange={setRating} />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Review</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={4}
              placeholder="Share your thoughts about this product..."
              className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black transition-colors resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">Review submitted successfully!</p>}

          <button
            type="submit"
            disabled={submitting}
            className="self-start border border-black bg-black text-white px-6 py-2 text-sm hover:bg-white hover:text-black transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Review list */}
      {loading ? (
        <p className="text-sm text-gray-400">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-gray-400">No reviews yet. Be the first!</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {reviews.map((review) => (
            <li key={review.id} className="border-b border-black/10 pb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{review.author}</span>
                <span className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <StarRating value={review.rating} />
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{review.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
