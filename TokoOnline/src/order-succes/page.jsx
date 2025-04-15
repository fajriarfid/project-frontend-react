"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      window.location.href = "/";
    }
  }, [countdown]);

  return (
    <div className="container py-16 text-center">
      <div className="order-success">
        <CheckCircle
          className="success-icon"
          style={{
            width: "6rem",
            height: "6rem",
            color: "#10b981",
            margin: "0 auto 1.5rem",
          }}
        />
        <h1 className="product-title mb-4">Order Successful!</h1>
        <p className="mb-6" style={{ fontSize: "1.125rem" }}>
          Thank you for your purchase. Your order{" "}
          {orderId && <span style={{ fontWeight: 600 }}>#{orderId}</span>} has
          been received.
        </p>
        <p className="mb-8">
          We've sent a confirmation email with your order details. You will be
          redirected to the homepage in {countdown} seconds.
        </p>
        <div className="order-success-actions">
          <Link href="/" className="btn btn-primary">
            Return to Home
          </Link>
          <Link
            href="/products"
            className="btn btn-outline"
            style={{ marginLeft: "1rem" }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
