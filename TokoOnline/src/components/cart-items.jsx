"use client";

import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItems() {
  const { cart, updateCartItem, removeFromCart, cartTotal } = useCart();

  if (!cart || cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
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
            <tr key={`${item.id}-${item.variant_id || "default"}`}>
              <td data-label="Product">
                <div className="cart-product">
                  <div className="cart-product-image">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="product-image"
                    />
                  </div>
                  <div className="cart-product-info">
                    <div className="cart-product-name">{item.name}</div>
                    {item.variant_name && (
                      <div className="cart-product-variant">
                        {item.variant_name}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td data-label="Price">
                <div className="cart-price">{formatPrice(item.price)}</div>
              </td>
              <td data-label="Quantity">
                <div className="cart-quantity">
                  <button
                    className="cart-quantity-button"
                    onClick={() =>
                      updateCartItem(
                        item.id,
                        item.quantity - 1,
                        item.variant_id
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateCartItem(
                        item.id,
                        Number.parseInt(e.target.value) || 1,
                        item.variant_id
                      )
                    }
                    className="cart-quantity-input"
                  />
                  <button
                    className="cart-quantity-button"
                    onClick={() =>
                      updateCartItem(
                        item.id,
                        item.quantity + 1,
                        item.variant_id
                      )
                    }
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </td>
              <td data-label="Total">
                <div className="cart-total">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </td>
              <td>
                <button
                  className="cart-remove"
                  onClick={() => removeFromCart(item.id, item.variant_id)}
                >
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
          <span className="summary-value">{formatPrice(cartTotal)}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Shipping</span>
          <span className="summary-value">Calculated at checkout</span>
        </div>
        <div className="summary-total">
          <span className="summary-total-label">Total</span>
          <span className="summary-total-value">{formatPrice(cartTotal)}</span>
        </div>
      </div>
    </div>
  );
}
