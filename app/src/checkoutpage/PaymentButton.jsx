// src/components/RazorpayPayButton.jsx
import { useState } from "react";
import api from "../api";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

// Load Razorpay SDK dynamically (only once)
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      console.log("Razorpay Loaded");
      resolve(true);
    };

    script.onerror = () => {
      console.error("Razorpay SDK failed to load");
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

const PaymentButton = ({
  amount,
  formData,
  validateForm,   // async from Formik
  disabled,
  cartItems = [],
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    console.log("Pay clicked. Amount (₹):", amount);
    console.log("Form data:", formData);

    // ✅ 1) WAIT for async validation
    const isValid = await validateForm();
    if (!isValid) {
      console.log("Validation failed");
      return;
    }

    if (!amount || amount <= 0) {
      console.log("Invalid amount:", amount);
      return;
    }

    setIsProcessing(true);

    // Load Razorpay script
    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded || !window.Razorpay) {
      alert("Unable to load Razorpay. Please try again.");
      setIsProcessing(false);
      return;
    }

    try {
      const amountInPaise = Math.round(amount * 100);

      // 2️⃣ Create order
      const orderRes = await api.post("/razorpay/order/create/", {
        amount: amountInPaise,
        currency: "INR",
      });

      console.log("Order created:", orderRes.data);
      const order_id = orderRes.data?.data?.id;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        name: "Bazhil",
        description: "Order Payment",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        order_id,

        handler: async function (response) {
          console.log("Razorpay success:", response);

          try {
            console.log("Sending verification request to backend...");

            // ✅ 2) SEND FLAT FIELDS THAT MATCH Transaction MODEL
            const verifyRes = await api.post("/razorpay/order/complete/", {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              amount: amountInPaise,

              full_name: formData.name,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              pincode: formData.pincode,

              cart_items: cartItems,
            });

            console.log("Verification success:", verifyRes.data);
            alert("Payment Successful!");
          } catch (err) {
            console.error("Verification failed:", err.response?.data || err);
            alert("Verification failed. Check console.");
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

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (res) {
        console.error("Razorpay Payment Failed:", res.error);
        alert("Payment Failed: " + res.error.description);
      });

      rzp.open();
    } catch (error) {
      console.error(
        "Order creation failed:",
        error.response?.data || error.message
      );
    } finally {
      setIsProcessing(false);
      console.log("Payment flow completed.");
    }
  };

  return (
    <Button
      variant="luxury"
      size="lg"
      className="w-full mt-6 group"
      onClick={handlePayment}
      disabled={isProcessing || disabled}
    >
      <CreditCard className="mr-2 h-5 w-5" />
      {isProcessing ? "Processing..." : "Pay with Razorpay"}
    </Button>
  );
};

export default PaymentButton;
