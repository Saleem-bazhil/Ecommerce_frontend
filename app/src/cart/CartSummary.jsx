import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const CartSummary = ({ cartTotal = 0, tax = 0 }) => {
  const subtotal = cartTotal.toFixed(2);
  const cartTax = tax.toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(cartTax)).toFixed(2);

  return (
    <div className="w-full lg:w-1/3">
      <div
        className="
          bg-card/80 rounded-2xl p-6 border border-border shadow-md
          backdrop-blur-xl
          hover:border-accent/70 hover:shadow-lg
          transition-all duration-300
        "
      >
        <h5 className="text-lg font-semibold text-foreground mb-4">
          Cart Summary
        </h5>

        <hr className="border-border mb-4" />

        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Subtotal:</span>
          <span className="text-foreground font-medium">₹ {subtotal}</span>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Tax:</span>
          <span className="text-foreground font-medium">₹ {cartTax}</span>
        </div>

        <div className="flex justify-between items-center mt-4 mb-6">
          <span className="font-semibold text-foreground">Total:</span>
          <span className="font-bold text-accent text-xl">₹ {total}</span>
        </div>

        <Link to="/checkout">
          <Button
                         variant="luxury"
                  className="w-full py-7 hover:scale-none">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
