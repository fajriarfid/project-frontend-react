"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Menu, Trash2 } from "lucide-react";
import Footer from "@/components/footer";

export default function CartPage() {
  const cart = [
    {
      id: 1,
      name: "MAIRA DRESS",
      price: 339000,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=75",
    },
    {
      id: 2,
      name: "EIDESINE RED",
      price: 449000,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=75",
    },
  ];

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
                <Link href="/products" className="nav-link">
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
                <Link href="/products" className="nav-link">
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
          <span>Cart</span>
        </div>
      </div>

      {/* Cart */}
      <div className="container">
        <h1 className="page-title">Your Cart</h1>

        <div className="cart-container">
          <table className="cart-table">
            <thead className="cart-header">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="cart-body">
              {cart.map((item) => (
                <tr key={item.id}>
                  <td data-label="Product">
                    <div className="cart-product">
                      <div className="cart-product-image">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={75}
                          height={100}
                        />
                      </div>
                      <div className="cart-product-info">
                        <div className="cart-product-name">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Price">
                    <div className="cart-price">
                      Rp. {item.price.toLocaleString("id-ID")}
                    </div>
                  </td>
                  <td data-label="Quantity">
                    <div className="cart-quantity">
                      <select
                        className="cart-quantity-select"
                        defaultValue={item.quantity}
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td data-label="Total">
                    <div className="cart-total">
                      Rp. {(item.price * item.quantity).toLocaleString("id-ID")}
                    </div>
                  </td>
                  <td>
                    <button className="cart-remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">
                Rp. {cartTotal.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Shipping</span>
              <span className="summary-value">Calculated at checkout</span>
            </div>
            <div className="summary-total">
              <span className="summary-total-label">Total</span>
              <span className="summary-total-value">
                Rp. {cartTotal.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <div className="cart-actions">
            <Link href="/products" className="btn-continue">
              Continue Shopping
            </Link>
            <Link href="/checkout" className="btn-checkout">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
