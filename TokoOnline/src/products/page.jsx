"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Menu } from "lucide-react";
import Footer from "@/components/footer";

export default function ProductsPage() {
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
          <span>Categories</span>
        </div>
      </div>

      {/* Products */}
      <div className="container">
        <section className="products-section">
          <div className="products-grid">
            {[
              { id: 1, name: "MAIRA DRESS", price: 339000 },
              { id: 2, name: "EIDESINE RED", price: 449000 },
              { id: 3, name: "EIDESINE MAROON", price: 499000 },
              { id: 4, name: "EIDESINE TOSCA", price: 419000 },
              { id: 5, name: "CORSA BLU", price: 425000 },
              { id: 6, name: "CORSA VERDE", price: 425000 },
              { id: 7, name: "SINCRO BOLD X", price: 449000 },
              { id: 8, name: "SINCRO PASTEL Y", price: 419000 },
            ].map((product) => (
              <div key={product.id} className="product-card">
                <Link href={`/products/${product.id}`}>
                  <div className="product-image-container">
                    <Image
                      src={`/placeholder.svg?height=400&width=300`}
                      alt={product.name}
                      fill
                      className="product-image"
                    />
                    <div className="product-brand">HIJJA</div>
                  </div>
                </Link>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    Rp. {product.price.toLocaleString("id-ID")}
                  </div>
                  <div className="product-quantity">
                    <select className="quantity-select">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="add-to-cart-button">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
