// src/pages/OrderItem.jsx (or wherever you keep it)
import React from "react";

const OrderItem = ({ item }) => {
  const product = item?.product;

  const rawPrice = product?.price ?? 0;
  const price = Number(rawPrice) || 0;
  const qty = item?.quantity ?? 1;
  const lineTotal = price * qty;

  return (
    <div
      className="
        flex items-center justify-between 
        mb-3 p-4 rounded-xl
        bg-card/60 border border-border/70 
        backdrop-blur-lg shadow-sm
        hover:border-accent/70 hover:shadow-md
        transition-all duration-300
      "
    >
      {/* Left: image + info */}
      <div className="flex items-center gap-4">
        <div
          className="
            h-14 w-14 overflow-hidden rounded-xl
            bg-gradient-to-br from-purple-700/60 via-fuchsia-500/40 to-pink-500/40
            border border-border/70
          "
        >
          <img
            src={product?.image}
            alt={product?.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-1">
          <h6 className="text-sm font-semibold text-foreground line-clamp-1">
            {product?.name}
          </h6>

          <p className="text-xs text-muted-foreground">
            Qty:{" "}
            <span className="font-semibold text-accent">
              {qty}
            </span>
          </p>
        </div>
      </div>

      {/* Right: line total */}
      <h6 className="text-sm font-semibold text-accent whitespace-nowrap">
        ₹ {lineTotal.toFixed(2)}
      </h6>
    </div>
  );
};

export default OrderItem;
