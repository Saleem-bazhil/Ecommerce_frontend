import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

const Products = () => {
  return (
    <section className="min-h-screen mx-auto px-16 py-20 mt-10">
      <div className="container mx-auto">
        <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
          All Products
        </h2>
        <p className="text-muted-foreground text-lg">
          Discover our complete collection of luxury items
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 mt-10">
          <Button variant="glass2" className="group">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
              // value={sortBy}
              // onChange={(e) => setSortBy(e.target.value)}
              className="bg-card border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-14 mb-10">
        <ProductCard/>
      </div>

    </section>
  );
};

export default Products;
