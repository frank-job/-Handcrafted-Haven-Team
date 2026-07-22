import Link from "next/link";
import Image from "next/image";

interface Product {
  _id: string;
  product_name: string;
  product_image: string;
  price: number;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product._id}`} className="group block border shadow-md  border-black/10 hover:border-black transition-colors">
            <div className="aspect-square overflow-hidden bg-gray-50 group-hover:opacity-75 transition-opacity">
                {/* Image Here */}
                <Image src={product.product_image} alt={product.product_name} width={500} height={500} className="object-cover w-full h-full" unoptimized />
            </div>
            <div className="mt-4">
                <h3 className="text-sm text-gray-700">{product.product_name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                </div>
            </Link>

    )
}