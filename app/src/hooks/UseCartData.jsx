import { useState, useEffect } from "react";
import api from "../api";
import React from "react";

const UseCartData = () => {
  const cart_code = localStorage.getItem("cart_code");
  const [cartData, setCartData] = useState(null);
  const [cartTotal, setCartTotal] = useState(0.0);
  const [loading, setLoading] = useState();
  const tax = 4.0;

  useEffect(() => {
    setLoading(true);
    api
      .get(`cart/${cart_code}/`)
      .then((response) => {
        setCartData(response.data);
        setCartTotal(response.data.sum_total);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cart_code]);

  return { cartData, setCartData, cartTotal, setCartTotal, loading, tax };
};

export default UseCartData;
