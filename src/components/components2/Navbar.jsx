import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Heart, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../../context/CardContext";

// ❌ remove prop numCartItems
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ get count from context
  const { cartCount } = useCart();

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/40 backdrop-blur-xl border-b border-border lg:px-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ELITORA
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/products" className="nav-link">
                Shop
              </Link>
              <Link to="/collections" className="nav-link">
                Collections
              </Link>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />

                  {cartCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-semibold
               bg-accent text-black rounded-full shadow-lg
               animate-pulse border border-white/30"
                    >
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 p-6 space-y-6 glass-gradient menu-slide z-40">
          <Link
            to="/"
            className="block nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/collections"
            className="block nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Collections
          </Link>
          <Link
            to="/about"
            className="block nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </>
  );
}
