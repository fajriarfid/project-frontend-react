"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilter({ categories = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchName, setSearchName] = useState(
    searchParams.get("search_name") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categories") || "all"
  );
  const [sorting, setSorting] = useState(
    searchParams.get("sorting") || "Latest"
  );

  const handleFilter = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchName) params.set("search_name", searchName);
    if (selectedCategory) params.set("categories", selectedCategory);
    if (sorting) params.set("sorting", sorting);

    router.push(`/products?${params.toString()}`);
  };

  return (
    <form onSubmit={handleFilter} className="product-filter">
      <div className="filter-group">
        <h3 className="filter-heading">Search</h3>
        <input
          type="text"
          placeholder="Search products..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="filter-group">
        <h3 className="filter-heading">Categories</h3>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="category-all"
              name="category"
              value="all"
              checked={selectedCategory === "all"}
              onChange={() => setSelectedCategory("all")}
              className="radio-input"
            />
            <label htmlFor="category-all">All Categories</label>
          </div>

          {categories.map((category) => (
            <div key={category.id} className="radio-item">
              <input
                type="radio"
                id={`category-${category.id}`}
                name="category"
                value={category.id.toString()}
                checked={selectedCategory === category.id.toString()}
                onChange={() => setSelectedCategory(category.id.toString())}
                className="radio-input"
              />
              <label htmlFor={`category-${category.id}`}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-heading">Sort By</h3>
        <div className="select-container">
          <select
            value={sorting}
            onChange={(e) => setSorting(e.target.value)}
            className="form-select"
          >
            <option value="Latest">Latest</option>
            <option value="Price-asc">Price: Low to High</option>
            <option value="Price-desc">Price: High to Low</option>
            <option value="Name-asc">Name: A to Z</option>
            <option value="Name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-full">
        Apply Filters
      </button>
    </form>
  );
}
