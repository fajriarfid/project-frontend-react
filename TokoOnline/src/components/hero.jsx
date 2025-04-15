"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero({ slides = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 5 seconds
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

  // Jika tidak ada slide, tampilkan default
  if (slides.length === 0) {
    return (
      <div className="hero">
        <div className="hero-slide active">
          <Image
            src="/images/hero-sambal.png"
            alt="Sambal Spesial Bu Udi"
            fill
            className="hero-image"
            priority
          />
          <div className="hero-content">
            <h2 className="hero-title">Menu terbaru:</h2>
            <h3 className="hero-subtitle">Sambal Spesial Bu Udi</h3>
            <p className="hero-subtitle">
              Discount 10% selama bulan November 2017
              <br />
              Order Sekarang!
            </p>
          </div>
          <div className="hero-url">www.hijjaindonesia.com</div>
        </div>

        <div className="hero-nav">
          <button
            className="hero-nav-button"
            onClick={goToPrevSlide}
            aria-label="Previous Slide"
          >
            <ChevronLeft />
          </button>
          <button
            className="hero-nav-button"
            onClick={goToNextSlide}
            aria-label="Next Slide"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hero">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title || `Slide ${index + 1}`}
            fill
            className="hero-image"
            priority={index === 0}
          />
          <div className="hero-content">
            {slide.title && <h2 className="hero-title">{slide.title}</h2>}
            {slide.subtitle && (
              <h3 className="hero-subtitle">{slide.subtitle}</h3>
            )}
          </div>
          <div className="hero-url">
            {slide.url || "www.hijjaindonesia.com"}
          </div>
        </div>
      ))}

      <div className="hero-nav">
        <button
          className="hero-nav-button"
          onClick={goToPrevSlide}
          aria-label="Previous Slide"
        >
          <ChevronLeft />
        </button>
        <button
          className="hero-nav-button"
          onClick={goToNextSlide}
          aria-label="Next Slide"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
