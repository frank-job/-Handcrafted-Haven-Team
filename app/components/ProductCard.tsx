import Link from "next/link";

export default function ProductCard({ product }) {
    return (
        <Link href={`/products/${product.id}`} className="group block border border-black/10 hover:border-black transition-colors">
            <div className="aspect-square overflow-hidden bg-gray-50 group-hover:opacity-75 transition-opacity">
                {/* Image Here */}
                Image
            </div>
            <div className="mt-4">
                <h3 className="text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                </div>
            </Link>

    )
}