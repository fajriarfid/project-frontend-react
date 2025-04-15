import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/hero.css";
import "../styles/products.css";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      image: "/images/banner.jpg",
      title: "",
      subtitle: "",
      content: "Discount 10% All Items-Order Sekarang!",
    },
  ];

  // Auto-rotate slides
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Bomber",
      price: 200000,
      image: "/images/Bomber.jpg",
      brand: "Jaket Bomber Pria",
    },
    {
      id: 2,
      name: "Kemeja",
      price: 150000,
      image: "/images/Kemeja.jpg",
      brand: "Kemeja Pria",
    },
    {
      id: 3,
      name: "Kaos",
      price: 75000,
      image: "/images/kaos.png",
      brand: "Kemeja",
    },
    {
      id: 4,
      name: "Kemeja Putih",
      price: 90000,
      image: "/images/putih.png",
      brand: "Putih",
    },
    {
      id: 5,
      name: "Jaket",
      price: 425000,
      image: "/images/jakettebal.png",
      brand: "Jaket Musim Dingin",
    },
    {
      id: 6,
      name: "Hoodie",
      price: 300000,
      image: "/images/hoodie.png",
      brand: "Hoodie Hitam",
    },
    {
      id: 7,
      name: "Jeans",
      price: 449000,
      image: "/images/jeans.jpg",
      brand: "Celana Jeans Pria",
    },
    {
      id: 8,
      name: "Celana Dasar",
      price: 200000,
      image: "/images/dasar.jpg",
      brand: "Celana Dasar Pria",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          >
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title || "Hero Image"}
              className="hero-image"
            />
            <div className="hero-content">
              {slide.title && <h2 className="hero-title">{slide.title}</h2>}
              {slide.subtitle && (
                <h3 className="hero-subtitle">{slide.subtitle}</h3>
              )}
              {slide.content && (
                <p className="hero-subtitle">{slide.content}</p>
              )}
            </div>
            <div className="hero-url">www.hijjaindonesia.com</div>
          </div>
        ))}
        <div className="hero-nav">
          <button className="hero-nav-button" onClick={goToPrevSlide}>
            <ChevronLeft />
          </button>
          <button className="hero-nav-button" onClick={goToNextSlide}>
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container">
        <section className="products-section">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/products/${product.id}`}>
                  <div className="product-image-container">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-brand">{product.brand}</div>
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
    </div>
  );
}
