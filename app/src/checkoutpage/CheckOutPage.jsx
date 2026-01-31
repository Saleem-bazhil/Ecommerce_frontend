// src/pages/CheckOutPage.jsx
import { MapPin, User, Mail, Phone, Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useFormik } from "formik";
import * as Yup from "yup";

import UseCartData from "../hooks/UseCartData";
import OrderSummary from "./OrderSummary";

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .trim()
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone is required"),
  address: Yup.string().trim().required("Address is required"),
  city: Yup.string().trim().required("City is required"),
  pincode: Yup.string()
    .trim()
    .matches(/^\d{6}$/, "Enter a valid 6-digit pincode")
    .required("Pincode is required"),
});

const CheckOutPage = () => {
  const { cartData, cartTotal, tax } = UseCartData();

  const safeSubtotal = Number(cartTotal) || 0;
  const safeTax = Number(tax) || 0;
  const totalWithTax = safeSubtotal + safeTax;

  // 🔁 Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
    },
    validationSchema,
    onSubmit: () => {
      // We’re not actually submitting here –
      // OrderSummary will call validateForm before payment.
    },
    validateOnBlur: true,
    validateOnChange: true,
  });


  const validateForm = async () => {
    const errors = await formik.validateForm();
    // mark all as touched so errors display
    formik.setTouched(
      {
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        pincode: true,
      },
      true
    );
    return Object.keys(errors).length === 0;
  };

  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <section className="min-h-screen bg-background px-4 md:px-8 lg:px-16 py-20 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-2">
            Checkout
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Complete your luxury purchase
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Shipping form + security notice */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6 shadow-glass">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-accent" />
                <h2 className="font-playfair text-2xl font-bold">
                  Shipping Information
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="flex items-center gap-2 text-sm"
                    >
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.name && errors.name ? "border-destructive" : ""
                      }
                    />
                    {touched.name && errors.name && (
                      <p className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="flex items-center gap-2 text-sm"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.email && errors.email
                          ? "border-destructive"
                          : ""
                      }
                    />
                    {touched.email && errors.email && (
                      <p className="text-xs text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="flex items-center gap-2 text-sm"
                  >
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="9876543210"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      touched.phone && errors.phone
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Street address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      touched.address && errors.address
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {touched.address && errors.address && (
                    <p className="text-xs text-destructive">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City + Pincode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Mumbai"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.city && errors.city ? "border-destructive" : ""
                      }
                    />
                    {touched.city && errors.city && (
                      <p className="text-xs text-destructive">{errors.city}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-sm">
                      Pincode
                    </Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="600001"
                      value={values.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.pincode && errors.pincode
                          ? "border-destructive"
                          : ""
                      }
                    />
                    {touched.pincode && errors.pincode && (
                      <p className="text-xs text-destructive">
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Security notice */}
            <div className="bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base">
                    Secure Payment
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is encrypted and secure. We use
                    Razorpay for processing all transactions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary + Pay button */}
          <OrderSummary
            cartData={cartData}
            cartTotal={cartTotal}
            tax={tax}
            totalWithTax={totalWithTax}
            formData={values}
            validateForm={validateForm} 
          />
        </div>
      </div>
    </section>
  );
};

export default CheckOutPage;
