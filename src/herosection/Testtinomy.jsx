import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles, Award, TrendingUp } from "lucide-react";

const details = [
  {
    icon: Award,
    title: "Premium Quality",
    desc: "Handpicked luxury products from renowned brands",
  },
  {
    icon: Sparkles,
    title: "Exclusive Collections",
    desc: "Limited edition items you won't find elsewhere",
  },
  {
    icon: TrendingUp,
    title: "Trusted by Thousands",
    desc: "Join our community of satisfied customers",
  },
];
export const Testtinomy = () => {
  return (
    <>
      {details.map((d, index) => (
        <Card key={index} className="px-4 py-10 group glow-card  transition-all duration-500 ease-out ">
          <CardContent>
            <d.icon className="h-12 w-12 text-accent mb-4 transform group-hover:scale-110 transition-transform" />
            <h3 className="font-playfair text-2xl font-bold mb-3">{d.title}</h3>
            <p className="text-muted-foreground">{d.desc}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
