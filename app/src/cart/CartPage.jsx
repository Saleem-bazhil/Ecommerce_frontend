import React from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import UseCartData from "../hooks/UseCartData";

const CartPage = () => {
  const {
    cartData,
    setCartData,
    cartTotal,
    setCartTotal,
    loading,
    tax,
  } = UseCartData();

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading your cart…</p>
      </section>
    );
  }

  if (!cartData || !cartData.items || cartData.items.length === 0) {
    return (
      <section className="min-h-screen px-4 md:px-16 py-24 bg-background ">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven’t added anything yet. Explore our collections
            and find something you love.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 md:px-12 py-24 mt-10 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Shopping Cart
          </h1>
          <p className="text-sm text-muted-foreground">
            Review your items and proceed to secure checkout.
          </p>
        </div>

        {/* Layout: items + summary */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {cartData.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                setCartData={setCartData}
                setCartTotal={setCartTotal}
              />
            ))}
          </div>

          <CartSummary cartTotal={cartTotal} tax={tax} />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
