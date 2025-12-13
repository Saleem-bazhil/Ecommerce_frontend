import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React from "react";
import watch from "../assets/product-watch.jpg";
import { Link } from "react-router-dom";
const TrendingCard = () => {
  return (
    <Card className="group  relative overflow-hidden rounded-2xl bg-card border border-border backdrop-blur-sm transition-all duration-500 hover:border-accent glow-card">
      <CardHeader className="p-0  ">
        <div className="absolute top-4 left-4 z-10 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
          best sell
        </div>

        <Link to="" className="block relative aspect-square overflow-hidden">
          <img
            src={watch}
            alt="Products"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      </CardHeader>
      <CardContent className="">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
          Timepieces
        </p>
        <h3 className="font-playfair text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
          Luxury Chronograph watch
        </h3>
      </CardContent>
      <CardFooter>
        <p className="text-xl font-bold text-accent mb-4">$1299.99</p>
      </CardFooter>
    </Card>
  );
};

export default TrendingCard;
