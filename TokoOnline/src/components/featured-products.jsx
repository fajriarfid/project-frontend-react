import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export default function FeaturedProducts({ products = [] }) {
  // Ambil 3 produk pertama untuk ditampilkan sebagai featured
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="products-section">
      <div className="products-grid md-grid-cols-3">
        {featuredProducts.map((product) => (
          <div key={product.id} className="featured-product">
            <Link href={`/products/${product.id}`}>
              <div className="product-image-container">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="product-image"
                />
              </div>
              <div className="featured-product-content">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price">
                  {product.discount_price ? (
                    <>
                      <span className="price-current">
                        {formatPrice(product.discount_price)}
                      </span>
                      <span className="price-original">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="price-current">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="view-all">
        <Link href="/products" className="btn btn-primary">
          View All Products
        </Link>
      </div>
    </section>
  );
}
