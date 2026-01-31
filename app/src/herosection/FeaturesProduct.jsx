import React from "react";
import { TrendingUp, ArrowRight,Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FeaturedCard from "./FeaturedCard";
import TrendingCard from "./TrendingCard";
import { Testtinomy } from "./Testtinomy";

const FeaturesProduct = () => {
  return (
    <section className="min-h-screen container mx-auto md:px-4 md:py-20 mt-8">
      <div className="flex justify-between">
        <div className="">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              TRENDING NOW
            </span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold">
            Featured Products
          </h2>
        </div>
        <div>
          <Link to="">
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 " />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
      </div>
         <div className="flex justify-between mt-18">
        <div className="">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Just Dropped
            </span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold">
            New Arrivals
          </h2>
        </div>
        <div>
          <Link to="">
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 " />
            </Button>
          </Link>
        </div>
      </div>
         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
                <TrendingCard/>
                <TrendingCard/>
                <TrendingCard/>
                <TrendingCard/>
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-31">
        <Testtinomy/>
      </div>
    </section>
  );
};

export default FeaturesProduct;
