import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart-context";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-top">
          <div className="logo-text">Hijja Indonesia</div>
          <div className="header-actions">
            <button className="search-button" aria-label="Search">
              <Search />
            </button>
            <Link to="/cart" className="cart-button" aria-label="Cart">
              <ShoppingCart />
              {cart && cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </Link>
            <button
              className="mobile-menu-button"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <nav className="nav-container">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                BRAND
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/information" className="nav-link">
                INFORMATION
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">
                BLOG
              </Link>
            </li>
          </ul>
        </nav>

        {isMenuOpen && (
          <nav className="mobile-nav">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link active" onClick={toggleMenu}>
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link" onClick={toggleMenu}>
                  BRAND
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/information"
                  className="nav-link"
                  onClick={toggleMenu}
                >
                  INFORMATION
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="nav-link" onClick={toggleMenu}>
                  BLOG
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
