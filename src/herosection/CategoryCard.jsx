import React from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
const categories = [
  { name: "Timepieces", icon: "⌚", gradient: "from-primary to-accent" },
  { name: "Jewelry", icon: "💎", gradient: "from-accent to-primary" },
  { name: "Fashion", icon: "👔", gradient: "from-primary/80 to-accent/80" },
  { name: "Accessories", icon: "👜", gradient: "from-accent/80 to-primary" },
];

const CategoryCard = () => {
  return (
     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {categories.map((c, index) => (
        <Link to={"/"} key={index} className="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br hover:scale-105 transition-transform duration-500">
          <Card className="w-full h-full flex justify-center">
             <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
            <div className='flex flex-col items-center justify-center p-6'>
            
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform z-10">{c.icon}</div>
              <h3 className="font-playfair text-2xl font-bold text-white z-10">{c.name}</h3>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCard;
