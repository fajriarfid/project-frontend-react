import ProductCard from "./product-card";

export default function ProductGrid({ products = [] }) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          brand={product.brand}
        />
      ))}
    </div>
  );
}
