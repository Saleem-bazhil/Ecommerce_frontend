import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
const ProductCard = () => {
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    api
      .get("/products/")
      .then((response) => {
        console.log(response);
        setCardData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {cardData.map((data, index) => (
        <Card
          key={index}
          className="group  relative overflow-hidden rounded-2xl bg-card border border-border backdrop-blur-sm transition-all duration-500 hover:border-accent glow-card"
        >
          <CardHeader className="p-0 ">
            <div className="absolute top-4 left-4 z-10 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
              best sell
            </div>
            <Link
              to={`/products/${data.id}`}
              className="block relative aspect-square overflow-hidden"
            >
              <img
                src={data.image}
                alt="Products"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </CardHeader>
          <CardContent className="">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              {data.category}
            </p>
            <h3 className="font-playfair text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
              {data.product_name}
            </h3>
          </CardContent>
          <CardFooter className="flex items-center justify-between px-4 pb-4">
            <p className="text-xl font-bold text-accent">₹ {data.price}</p>

            <Link
              to={`/products/${data.id}`}
              className="text-xs text-muted-foreground hover:text-accent transition-colors underline underline-offset-2"
            >
              View details
            </Link>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ProductCard;
