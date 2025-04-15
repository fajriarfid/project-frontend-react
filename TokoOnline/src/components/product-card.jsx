"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ id, name, price, image, brand }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-card">
      <Link href={`/products/${id}`}>
        <div className="product-image-container">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="product-image"
            priority
          />
          {brand && <div className="product-brand">{brand}</div>}
        </div>
      </Link>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-price">{formatPrice(price)}</div>

        <div className="product-quantity">
          <select
            className="quantity-select"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {[...Array(10)].map((_, index) => {
              const num = index + 1;
              return (
                <option key={num} value={num}>
                  {num}
                </option>
              );
            })}
          </select>
        </div>

        <button className="add-to-cart-button">ADD TO CART</button>
      </div>
    </div>
  );
}
