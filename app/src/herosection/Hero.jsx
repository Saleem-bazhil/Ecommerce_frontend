import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import banner from "../assets/hero-banner.jpg";
import ShopCategory from "./ShopCategory";

const Hero = () => {
  return (
    <>
      <section className=" relative min-h-screen flex flex-col justify-center items-center overflow-hidden mt-8 px-6 md:px-0">
        {/* Background Image */}
        <div className="absolute inset-0 -z-30">
          <img
            src={banner}
            alt="Luxury hero banner"
            className="w-full h-full object-cover opacity-40 float"
          />
        </div>

        {/* Deep Hero Gradient */}
        <div className="gradient-hero absolute inset-0 -z-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30"></div>

        {/* Soft Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/70 to-background -z-20" />

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-xl">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium ml-2">
              New Luxury Collection 2025
            </span>
          </div>

          <h1 className="font-playfair glow-text text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent text-shadow-xl my-4">
            Elevate Your
            <br />
            Lifestyle
          </h1>

          <p
            className="
              text-base sm:text-lg md:text-2xl
              text-muted-foreground
              mb-8 sm:mb-10 md:mb-12
              max-w-xl mx-auto
              px-3 sm:px-6 md:px-0
            "
          >
            
            Discover premium products curated for those who appreciate the
            finest things in life.
          </p>

          <div
            className="
                    flex flex-col
                    sm:flex-row
                    items-center
                    justify-center
                    gap-4 sm:gap-5
                    px-4 sm:px-0
                  "
          >
            <Link to="/products" className="w-full sm:w-auto">
              <Button
                variant="luxury"
                size="lg"
                className="group w-full sm:w-auto"
              >
                Explore Collection
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Button
              variant="glass"
              size="lg"
              className="group w-full sm:w-auto"
            >
              Limited Edition
            </Button>
          </div>
        </div>
      </section>

      {/* Test Section */}
      <ShopCategory />
    </>
  );
};

export default Hero;
