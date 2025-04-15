// =========================
// API functions (FINAL VERSION)
// =========================

// Get provinces list
export async function getProvinces() {
  try {
    const response = await fetch("https://sistemtoko.com/public/demo/province");
    if (!response.ok) throw new Error("Failed to fetch provinces");

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
}

// Get cities list by province ID
export async function getCities(provinceId) {
  try {
    const response = await fetch(
      `https://sistemtoko.com/public/demo/city?province_id=${provinceId}`
    );
    if (!response.ok) throw new Error("Failed to fetch cities");

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}

// Get districts list by city ID
export async function getDistricts(cityId) {
  try {
    const response = await fetch(
      `https://sistemtoko.com/public/demo/district?city_id=${cityId}`
    );
    if (!response.ok) throw new Error("Failed to fetch districts");

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching districts:", error);
    return [];
  }
}

// Submit order
export async function submitOrder(orderData) {
  try {
    const response = await fetch(
      "https://sistemtoko.com/public/demo/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) throw new Error("Failed to submit order");

    return await response.json();
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error; // penting agar bisa ditangkap di halaman pemesanan
  }
}

// Get cart items
export async function getCart() {
  try {
    const response = await fetch("https://sistemtoko.com/public/demo/cart");
    if (!response.ok) throw new Error("Failed to fetch cart");

    const data = await response.json();

    // Validasi struktur data
    if (!data || !Array.isArray(data.items)) {
      return { items: [] };
    }

    return data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return { items: [] };
  }
}

// Get product detail
export async function getProductDetail(productId) {
  try {
    const response = await fetch(
      `https://sistemtoko.com/public/demo/product/${productId}`
    );
    if (!response.ok) throw new Error("Failed to fetch product detail");

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    return null;
  }
}
