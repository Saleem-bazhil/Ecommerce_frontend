import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
  {
    variants: {
      variant: {
        luxury:
          "gradient-purple text-white shadow-luxury hover:shadow-glow hover:scale-105 active:scale-95 transition-all",
          glass2:"bg-white/5 backdrop-blur-md border border-white/10 text-foreground hover:bg-white/10 hover:border-accent shadow-glass",

        glass:
          "bg-[var(--gradient-glass)] text-white border border-white/20 hover:border-accent hover:shadow-glass hover:scale-105 active:scale-95 backdrop-blur-xl transition-all duration-300 ease-out",

        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",

        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/40",

        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",

        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",

        link:
          "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default: "h-10 px-6",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 py-3 px-8 text-base",
        icon: "size-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
