import { useState } from "react";
import api from "../api";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

/* ----------------------------------------
   Load Razorpay SDK (only once)
----------------------------------------- */
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

const RazorpayPayButton = ({
  amount,        // decimal amount from UI (e.g. 5465.01)
  formData,
  validateForm,
  disabled,
  cartItems = [],
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    console.log("Pay clicked. Amount:", amount);
    console.log("Form data:", formData);

    // 1️⃣ Validate checkout form
    const isValid = await validateForm();
    if (!isValid) {
      console.log("Form validation failed");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Invalid amount");
      return;
    }

    setIsProcessing(true);

    // 2️⃣ Load Razorpay SDK
    const loaded = await loadRazorpayScript();
    if (!loaded || !window.Razorpay) {
      alert("Razorpay SDK failed to load");
      setIsProcessing(false);
      return;
    }

    try {
      // 🔥 IMPORTANT FIX
      // Backend expects INTEGER rupees (NOT decimal)
      const roundedAmount = Math.round(amount);

      // 3️⃣ Create Razorpay Order (Backend)
      const orderRes = await api.post("/razorpay/order/create/", {
        amount: roundedAmount, // ✅ INTEGER ONLY
        currency: "INR",
      });

      console.log("Order response:", orderRes.data);

      const orderId = orderRes.data?.data?.id;
      if (!orderId) {
        throw new Error("Order ID not received from backend");
      }

      // 4️⃣ Razorpay Checkout Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Test / Live key
        name: "Bazhil Groups",
        description: "Order Payment",
        order_id: orderId,

        handler: async function (response) {
          console.log("Payment success:", response);

          try {
            // 5️⃣ Verify & Save Transaction
            const verifyRes = await api.post("/razorpay/order/complete/", {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,

              amount: roundedAmount, // ✅ INTEGER
              full_name: formData.name,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              pincode: formData.pincode,
              cart_items: cartItems,
            });

            console.log("Verification success:", verifyRes.data);
            alert("Payment Successful ");
          } catch (err) {
            console.error("Verification failed:", err.response?.data || err);
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        notes: {
          address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
        },

        theme: {
          color: "#7a18e6",
        },
      };

      // 6️⃣ Open Razorpay Checkout
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (res) {
        console.error("Payment failed:", res.error);
        alert(res.error.description);
      });

      rzp.open();
    } catch (error) {
      console.error(
        "Order creation failed:",
        error.response?.data || error.message
      );
      alert("Unable to initiate payment");
    } finally {
      setIsProcessing(false);
      console.log("Payment flow completed");
    }
  };

  return (
    <Button
      variant="luxury"
      size="lg"
      className="w-full mt-6"
      onClick={handlePayment}
      disabled={isProcessing || disabled}
    >
      <CreditCard className="mr-2 h-5 w-5" />
      {isProcessing ? "Processing..." : "Pay with Razorpay"}
    </Button>
  );
};

export default RazorpayPayButton;
