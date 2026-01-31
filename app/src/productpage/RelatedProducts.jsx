import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Star } from "lucide-react";

const RelatedProducts = ({ products = [] }) => {
  if (!products.length) return null;

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-playfair text-2xl md:text-3xl font-bold">
            Related Products
          </h3>
          <p className="text-muted-foreground text-sm md:text-base">
            You might also like these similar items
          </p>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border backdrop-blur-sm transition-all duration-500 hover:border-accent"
          >
            <CardHeader className="p-0">
              <Link
                to={`/products/${product.id}`}
                className="block relative aspect-square overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.product_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </CardHeader>

       <CardContent className="pt-4">
  {/* Category + Rating on same row */}
  <div className="flex justify-between items-center mb-2">
    <p className="text-xs text-muted-foreground uppercase tracking-wider">
      {product.category}
    </p>

    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      <Star className="h-3 w-3 text-accent" />
      <span>{product.rating}</span>
    </div>
  </div>

  {/* Title */}
  <h4 className="font-playfair text-base md:text-lg font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
    {product.product_name}
  </h4>
</CardContent>


            <CardFooter className="flex items-center justify-between pt-0 pb-4 px-4">
              <p className="text-lg font-bold text-accent">
                ₹ {product.price}
              </p>
              <Link
                to={`/products/${product.id}`}
                className="text-xs text-muted-foreground hover:text-accent transition-colors underline underline-offset-2"
              >
                View details
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
