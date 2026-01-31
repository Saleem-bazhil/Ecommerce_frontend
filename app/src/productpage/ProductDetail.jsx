import React, { useEffect, useState } from "react";
import watch from "../assets/product-watch.jpg";
import { Heart, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import RelatedProducts from "./RelatedProducts";
import { useCart } from "../context/CardContext";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false);

  const { cartCode, cartItems, fetchCartItems } = useCart();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    api
      .get(`/productsDetails/${id}/`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
        setSimilarProducts(response.data.similar_products || []);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load product details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // ✅ Check if product is in cart using context cartItems
  useEffect(() => {
    if (!product?.id) return;

    const exists = cartItems.some((item) => item.product.id === product.id);
    setInCart(exists);
  }, [cartItems, product?.id]);

  // Add to cart
  const addToCart = () => {
    if (!cartCode || !product?.id) return;

    const newItem = {
      cart_code: cartCode,
      product_id: product.id,
    };

    api
      .post("addCartItem/", newItem)
      .then((response) => {
        console.log(response.data);
        setInCart(true);
        toast.success("Product added to cart successfully!");
        fetchCartItems();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add product to cart");
      });
  };

  if (loading) {
    return (
      <section className="min-h-screen px-16 py-20 flex items-center justify-center">
        <p className="text-muted-foreground">Loading product details…</p>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="min-h-screen px-16 py-20 flex items-center justify-center">
        <p className="text-destructive">{error || "Product not found"}</p>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-screen px-16 py-20">
        <div className="container mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-12 mb-8">
            <Link to="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/products"
              className="hover:text-accent transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.product_name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Image */}
            <div className="relative overflow-hidden aspect-square rounded-2xl bg-card border border-border">
              <img
                src={product.image || watch}
                alt={product.product_name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <p className="text-sm text-accent uppercase tracking-wider mb-2">
                {product.category}
              </p>

              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
                {product.product_name}
              </h2>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-accent" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  (127 reviews)
                </span>
              </div>

              <h4 className="text-4xl font-bold text-accent mb-6">
                ₹ {product.price}
              </h4>

              <p className="text-muted-foreground leading-relaxed">
                {product.description ||
                  "Experience timeless elegance with this premium product."}
              </p>

              {/* Key features */}
              {product.key_features && (
                <>
                  <p className="font-semibold mb-3">Key Features</p>
                  <ul className="space-y-2">
                    {product.key_features.split(";").map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {feature.trim()}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Actions with cart logic */}
              <div className="flex items-center gap-4">
                <Button
                  variant="luxury"
                  className="w-full py-7 hover:scale-none"
                  onClick={addToCart}
                  disabled={inCart}
                >
                  {inCart ? "Product Added to Cart" : "Add To Cart"}
                </Button>
                <Button
                  variant="glass2"
                  className="py-7 rounded-2xl border border-border"
                >
                  <Heart className="border border-border" />
                </Button>
              </div>

              <Button variant="glass" className="w-full py-7 hover:scale-none">
                Buy Now
              </Button>

              {/* Info icons */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-accent" />
                  <div className="text-sm">
                    <p className="font-semibold">Free Shipping</p>
                    <p className="text-muted-foreground">On orders over ₹500</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-accent" />
                  <div className="text-sm">
                    <p className="font-semibold">Secure Payment</p>
                    <p className="text-muted-foreground">
                      100% protected checkout
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-accent" />
                  <div className="text-sm">
                    <p className="font-semibold">Easy Returns</p>
                    <p className="text-muted-foreground">7-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
          {/* Related Products */}
          {similarProducts.length > 0 && (
            <div className="mt-14 mb-10">
              <RelatedProducts products={similarProducts} />
            </div>
          )}
      </section>
    </>
  );
};

export default ProductDetail;
