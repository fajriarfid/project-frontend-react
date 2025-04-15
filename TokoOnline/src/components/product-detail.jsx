"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0
      ? product.variants[0].id
      : null
  );
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart } = useCart();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discount_price || product.price,
      image: product.image,
      quantity,
      variant_id: selectedVariant,
    });
  };

  return (
    <div className="product-detail">
      {/* Product Images */}
      <div className="product-gallery">
        <div className="product-main-image">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="product-image"
          />
        </div>

        {/* Thumbnails */}
        {product.images && product.images.length > 0 && (
          <div className="product-thumbnails">
            {product.images.map((image, index) => (
              <div key={index} className="product-thumbnail">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="product-image"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info-container">
        <h1 className="product-title">{product.name}</h1>

        {/* Rating */}
        <div className="product-rating">
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`star ${
                  star <= (product.rating || 0) ? "star-filled" : "star-empty"
                }`}
              />
            ))}
          </div>
          <span className="rating-count">
            {product.reviews_count || 0} reviews
          </span>
        </div>

        {/* Price */}
        <div className="product-price-container">
          {product.discount_price ? (
            <div className="product-price">
              <span className="price-current">
                {formatPrice(product.discount_price)}
              </span>
              <span className="price-original">
                {formatPrice(product.price)}
              </span>
              <span className="price-discount">
                {Math.round(
                  ((product.price - product.discount_price) / product.price) *
                    100
                )}
                % OFF
              </span>
            </div>
          ) : (
            <span className="price-current">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Description */}
        <div className="product-description">
          <p>{product.description}</p>
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="product-variants">
            <h3 className="variants-title">Variants</h3>
            <div className="variants-list">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  className={`variant-button ${
                    selectedVariant === variant.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedVariant(variant.id)}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="product-quantity">
          <h3 className="quantity-title">Quantity</h3>
          <div className="quantity-controls">
            <button
              className="quantity-button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number.parseInt(e.target.value) || 1)
              }
              className="quantity-input"
            />
            <button className="quantity-button" onClick={increaseQuantity}>
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="btn btn-primary btn-lg add-to-cart-button"
        >
          <ShoppingCart className="h-5 w-5" style={{ marginRight: "0.5rem" }} />
          Add to Cart
        </button>

        {/* Tabs */}
        <div className="product-tabs">
          <div className="tabs-list">
            <button
              className={`tab-trigger ${
                activeTab === "description" ? "active" : ""
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`tab-trigger ${
                activeTab === "specifications" ? "active" : ""
              }`}
              onClick={() => setActiveTab("specifications")}
            >
              Specifications
            </button>
            <button
              className={`tab-trigger ${
                activeTab === "reviews" ? "active" : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div
            className={`tab-content ${
              activeTab === "description" ? "" : "hidden"
            }`}
          >
            <div className="prose">
              <div
                dangerouslySetInnerHTML={{
                  __html: product.full_description || product.description,
                }}
              />
            </div>
          </div>

          <div
            className={`tab-content ${
              activeTab === "specifications" ? "" : "hidden"
            }`}
          >
            {product.specifications ? (
              <div className="prose">
                <div
                  dangerouslySetInnerHTML={{ __html: product.specifications }}
                />
              </div>
            ) : (
              <p>No specifications available.</p>
            )}
          </div>

          <div
            className={`tab-content ${activeTab === "reviews" ? "" : "hidden"}`}
          >
            {product.reviews && product.reviews.length > 0 ? (
              <div className="reviews-list">
                {product.reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`star ${
                              star <= review.rating
                                ? "star-filled"
                                : "star-empty"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="review-author">{review.name}</span>
                    </div>
                    <p className="review-text">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
