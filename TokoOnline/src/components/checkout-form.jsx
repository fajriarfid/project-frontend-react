"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { getProvinces, getCities, getDistricts, submitOrder } from "@/lib/api";

export default function CheckoutForm() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    province_id: "",
    city_id: "",
    district_id: "",
    postal_code: "",
    notes: "",
    payment_method: "bank_transfer",
    shipping_method: "regular",
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    setFormData({
      ...formData,
      province_id: provinceId,
      city_id: "",
      district_id: "",
    });
    setCities([]);
    setDistricts([]);

    try {
      const data = await getCities(provinceId);
      setCities(data);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    setFormData({ ...formData, city_id: cityId, district_id: "" });
    setDistricts([]);

    try {
      const data = await getDistricts(cityId);
      setDistricts(data);
    } catch (error) {
      console.error("Failed to fetch districts:", error);
    }
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setFormData({ ...formData, district_id: districtId });

    const randomShipping = Math.floor(Math.random() * 50000) + 10000;
    setShippingCost(randomShipping);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      setFormError(
        "Your cart is empty. Please add items to your cart before checking out."
      );
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const orderData = {
        ...formData,
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          variant_id: item.variant_id || null,
        })),
        total: cartTotal + shippingCost,
      };

      const response = await submitOrder(orderData);
      clearCart();
      router.push(`/order-success?order_id=${response.order_id}`);
    } catch (error) {
      console.error("Failed to submit order:", error);
      setFormError("Failed to place order. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      {/* Customer Info */}
      <div className="form-section">
        <h2 className="form-section-title">Customer Information</h2>

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <h2 className="form-section-title">Shipping Address</h2>

        <div className="form-group">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="province" className="form-label">
            Province
          </label>
          <select
            id="province"
            name="province_id"
            value={formData.province_id}
            onChange={handleProvinceChange}
            required
            className="form-select"
          >
            <option value="">Select province</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <select
            id="city"
            name="city_id"
            value={formData.city_id}
            onChange={handleCityChange}
            disabled={!formData.province_id}
            required
            className="form-select"
          >
            <option value="">Select city</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="district" className="form-label">
            District
          </label>
          <select
            id="district"
            name="district_id"
            value={formData.district_id}
            onChange={handleDistrictChange}
            disabled={!formData.city_id}
            required
            className="form-select"
          >
            <option value="">Select district</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="postal_code" className="form-label">
            Postal Code
          </label>
          <input
            id="postal_code"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes" className="form-label">
            Order Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="form-textarea"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="form-section">
        <h2 className="form-section-title">Order Summary</h2>

        <div className="order-summary">
          {cart &&
            cart.map((item) => (
              <div
                key={`${item.id}-${item.variant_id || "default"}`}
                className="order-item"
              >
                <div>
                  <span className="order-item-name">{item.name}</span>
                  {item.variant_name && (
                    <span className="order-item-variant">
                      ({item.variant_name})
                    </span>
                  )}
                  <span className="order-item-quantity">x{item.quantity}</span>
                </div>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}

          <div className="order-summary-divider"></div>

          <div className="order-summary-row">
            <span className="order-summary-label">Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="order-summary-row">
            <span className="order-summary-label">Shipping</span>
            <span>
              {shippingCost
                ? formatPrice(shippingCost)
                : "Calculate after selecting district"}
            </span>
          </div>
          <div className="order-summary-total">
            <span>Total</span>
            <span>{formatPrice(cartTotal + shippingCost)}</span>
          </div>
        </div>

        {/* Shipping Method */}
        <h2 className="form-section-title">Shipping Method</h2>
        <div className="form-group">
          <label>
            <input
              type="radio"
              name="shipping_method"
              value="regular"
              checked={formData.shipping_method === "regular"}
              onChange={handleInputChange}
            />{" "}
            Regular Shipping (2-3 days)
          </label>
          <label>
            <input
              type="radio"
              name="shipping_method"
              value="express"
              checked={formData.shipping_method === "express"}
              onChange={handleInputChange}
            />{" "}
            Express Shipping (1 day)
          </label>
        </div>

        {/* Payment Method */}
        <h2 className="form-section-title">Payment Method</h2>
        <div className="form-group">
          <label>
            <input
              type="radio"
              name="payment_method"
              value="bank_transfer"
              checked={formData.payment_method === "bank_transfer"}
              onChange={handleInputChange}
            />{" "}
            Bank Transfer
          </label>
          <label>
            <input
              type="radio"
              name="payment_method"
              value="credit_card"
              checked={formData.payment_method === "credit_card"}
              onChange={handleInputChange}
            />{" "}
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="payment_method"
              value="cod"
              checked={formData.payment_method === "cod"}
              onChange={handleInputChange}
            />{" "}
            Cash on Delivery
          </label>
        </div>

        {formError && <div className="form-error">{formError}</div>}

        <button
          type="submit"
          className="btn btn-primary btn-lg btn-full"
          disabled={
            isSubmitting ||
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.address ||
            !formData.province_id ||
            !formData.city_id ||
            !formData.district_id ||
            !formData.postal_code ||
            !shippingCost
          }
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </div>
    </form>
  );
}
