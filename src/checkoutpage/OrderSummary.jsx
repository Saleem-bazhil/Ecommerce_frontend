// src/pages/OrderSummary.jsx
import React from "react";
import OrderItem from "./OrderItem";
import { ShoppingBag } from "lucide-react";
import PaymentButton from "./PaymentButton";

const OrderSummary = ({
  cartData,
  cartTotal = 0,
  tax = 0,
  totalWithTax = 0,
  formData,
  validateForm,
}) => {
  const items = cartData?.items || [];
  const safeSubtotal = Number(cartTotal) || 0;
  const safeTax = Number(tax) || 0;
  const total = totalWithTax || safeSubtotal + safeTax;

  return (
    <div className="w-full space-y-6">
      <div
        className="
          bg-card backdrop-blur-sm border border-border rounded-2xl 
          p-6 shadow-glass sticky top-24
        "
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag className="h-6 w-6 text-accent" />
          <h2 className="font-playfair text-2xl font-bold">Order Summary</h2>
        </div>

        {/* Items list */}
        <div className="space-y-3 mb-6 h-72 overflow-y-auto pr-1 order-scroll">
          {items.length > 0 ? (
            items.map((item) => <OrderItem key={item.id} item={item} />)
          ) : (
            <p className="text-sm text-muted-foreground">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Totals */}
        <div className="border-t border-border pt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold text-foreground">
              ₹ {safeSubtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-semibold text-foreground">
              ₹ {safeTax.toFixed(2)}
            </span>
          </div>

          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="font-bold text-base">Total</span>
            <span className="font-playfair text-2xl font-bold text-accent">
              ₹ {total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Razorpay button in its own component */}
        <PaymentButton
  amount={totalWithTax}
  formData={formData}
  validateForm={validateForm}
  disabled={cartData?.items?.length === 0}
  cartItems={items}
/>

        <p className="text-xs text-center text-muted-foreground mt-4">
          By completing your purchase, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
