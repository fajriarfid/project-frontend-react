"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Menu, Star, Minus, Plus } from "lucide-react";
import Footer from "@/components/footer";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;

  // Dummy product data
  const product = {
    id: id,
    name: "MAIRA DRESS",
    price: 339000,
    description:
      "Maira Dress adalah dress casual yang nyaman dipakai sehari-hari. Terbuat dari bahan katun premium yang adem dan tidak mudah kusut.",
    image: "/placeholder.svg?height=600&width=450",
    brand: "HIJJA",
    rating: 4.5,
    reviews_count: 12,
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-top">
            <div className="logo-container">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Hijja Indonesia"
                  width={120}
                  height={70}
                  className="logo"
                />
              </Link>
              <div className="logo-text">Hijja Indonesia</div>
            </div>

            <div className="header-actions">
              <button className="search-button">
                <Search />
                <span className="sr-only">Search</span>
              </button>
              <Link href="/cart" className="cart-button">
                <ShoppingCart />
                <span className="sr-only">Cart</span>
              </Link>
              <button
                className="mobile-menu-button"
                onClick={() => {
                  const mobileNav = document.querySelector(".mobile-nav");
                  if (mobileNav) {
                    mobileNav.classList.toggle("active");
                  }
                }}
              >
                <Menu />
              </button>
            </div>
          </div>

          <nav className="nav-container">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/products" className="nav-link active">
                  BRAND
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/information" className="nav-link">
                  INFORMATION
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/blog" className="nav-link">
                  BLOG
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="mobile-nav">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/products" className="nav-link active">
                  BRAND
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/information" className="nav-link">
                  INFORMATION
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/blog" className="nav-link">
                  BLOG
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container breadcrumb-container">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container">
        <div className="product-detail">
          <div className="product-gallery">
            <div className="product-main-image">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="product-image"
              />
            </div>
          </div>

          <div className="product-info-container">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-rating">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`star ${
                      star <= Math.floor(product.rating)
                        ? "star-filled"
                        : "star-empty"
                    }`}
                  />
                ))}
              </div>
              <span className="rating-count">
                {product.reviews_count} reviews
              </span>
            </div>

            <div className="product-price-container">
              <span className="price-current">
                Rp. {product.price.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-quantity">
              <h3 className="quantity-title">Quantity</h3>
              <div className="quantity-controls">
                <button className="quantity-button">
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="quantity-input"
                />
                <button className="quantity-button">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button className="add-to-cart-button">ADD TO CART</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
