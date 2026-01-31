import React from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-18 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-playfair font-bold   bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent text-shadow-xl">
              ELITORA
            </h3>
            <p className="text-sm text-muted-foreground">
              Elevate Your Lifestyle
            </p>
            <div className="flex space-x-4">
              <Link
                to="#"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/products"
                  className="hover:text-accent transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="hover:text-accent transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="hover:text-accent transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/sale"
                  className="hover:text-accent transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>
<div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/products"
                  className="hover:text-accent transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="hover:text-accent transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="hover:text-accent transition-colors"
                >
                 Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/sale"
                  className="hover:text-accent transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/products"
                  className="hover:text-accent transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="hover:text-accent transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="hover:text-accent transition-colors"
                >
                 Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/sale"
                  className="hover:text-accent transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
        </div>
       <div className="border-t">
         <p className="text-center mt-10">© 2025 ELITORA. All rights reserved.</p>
       </div>
      </div>
    </footer>
  );
};

export default Footer;
