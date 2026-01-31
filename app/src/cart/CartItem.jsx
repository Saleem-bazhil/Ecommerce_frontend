import React, { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";

const CartItem = ({ item, setCartData, setCartTotal }) => {
  const product = item?.product;
  const [quantity, setQuantity] = useState(item?.quantity ?? 1);
  const maxQty = product?.stock || 10;

  const safeSubtotal =
    typeof item?.total === "number" ? item.total.toFixed(2) : "0.00";

  const handleQuantityChange = (value) => {
    const num = Number(value);
    if (!num || num < 1) return setQuantity(1);
    if (num > maxQty) return setQuantity(maxQty);
    setQuantity(num);
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(maxQty, prev + 1));
  };

  const updateCartItem = () => {
    api
      .put(`/updateCartItem/${item.id}/`, { quantity: Number(quantity) })
      .then((response) => {
        const updatedTotal = response.data.total;
        toast.success("Cart updated successfully!");

        setCartData((prevData) => {
          const updatedItems = prevData.items.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: Number(quantity), total: updatedTotal }
              : cartItem
          );

          const newTotal = updatedItems.reduce(
            (acc, curr) => acc + curr.total,
            0
          );
          setCartTotal(newTotal);

          return { ...prevData, items: updatedItems };
        });
      })
      .catch((error) => {
        console.error("Update error:", error);
        toast.error("Failed to update cart");
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (!confirmDelete) return;

    setCartData((prevData) => {
      const updatedItems = prevData.items.filter((i) => i.id !== id);
      const newTotal = updatedItems.reduce((sum, i) => sum + i.total, 0);
      setCartTotal(newTotal);
      return { ...prevData, items: updatedItems };
    });

    api
      .delete(`/updateCartItem/${id}/`)
      .then(() => {
        toast.success("Item removed from cart");
      })
      .catch((error) => {
        console.error("Remove error:", error);
        toast.error("Failed to remove item");
      });
  };

  return (
    <div className="w-full">
      <div
        className="
          group mb-4 px-4 py-4 md:px-5 md:py-5 rounded-2xl
          flex flex-col md:flex-row items-center justify-between gap-4
          bg-card/80 border border-border/70 shadow-md
          backdrop-blur-xl
          hover:border-accent/80 transition-all duration-300
        "
      >
        {/* LEFT: image + info */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div
            className="
              relative h-20 w-20 md:h-24 md:w-24
              overflow-hidden rounded-2xl
              bg-gradient-to-br from-purple-700/60 via-fuchsia-500/40 to-pink-500/40
              border border-border/70
            "
          >
            <img
              src={product?.image}
              alt={product?.name || "Product"}
              className="
                h-full w-full object-cover
                group-hover:scale-105 transition-transform duration-500
              "
            />
          </div>

          <div className="space-y-1">
            <h5 className="text-sm md:text-base font-semibold text-foreground line-clamp-1">
              {product?.name || "No name"}
            </h5>
            <p className="text-xs md:text-sm text-muted-foreground">
              Subtotal:{" "}
              <span className="font-semibold text-accent">
                ₹ {safeSubtotal}
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT: qty + Buttons */}
        <div className="flex items-center gap-3 self-stretch md:self-auto justify-end">
          {/* Quantity pill with - / + */}
          <div
            className="
              flex items-center gap-2
              rounded-2xl border border-border/80 bg-background/40
              px-3 py-2
            "
          >
            <Button
              onClick={handleDecrease}
              variant="glass"
              className="h-9 w-9 rounded-full p-0 flex items-center justify-center text-lg
             hover:bg-accent/20 transition"
            >
              −
            </Button>

            <input
              type="number"
              min="1"
              max={maxQty}
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="
                w-14 text-center text-sm text-foreground
                bg-transparent border-none outline-none
                [appearance:textfield]
                [&::-webkit-outer-spin-Button]:appearance-none
                [&::-webkit-inner-spin-Button]:appearance-none
              "
            />

            <Button
              onClick={handleIncrease}
              variant="glass"
              className="h-9 w-9 rounded-full p-0 flex items-center justify-center text-lg
             hover:bg-accent/20 transition"
            >
              +
            </Button>
          </div>

          <Button
            onClick={updateCartItem}
            variant="glass"
            className="h-9 rounded-xl px-4 flex items-center justify-center 
             hover:scale-none hover:shadow-none"
          >
            Update
          </Button>

          <Button
            variant="luxury"
            onClick={() => handleDelete(item.id)}
            className="h-9 rounded-xl px-4 flex items-center justify-center 
             hover:scale-none hover:shadow-none"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
