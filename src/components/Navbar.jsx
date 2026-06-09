import React, { useState, useEffect } from "react";
import { Menu, X, Phone, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const LOGO_URL = "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/4fa3237c0_WhatsAppImage2026-04-27at122434.jpg";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Visit Us", href: "/visit-us" },
  { label: "Contact", href: "/contact" },
];


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ?
      "bg-background/95 backdrop-blur-md shadow-sm" :
      "bg-transparent"}`
      }>
      
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="Bali Cafe Logo"
            className="h-12 w-12 rounded-full object-cover" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
          <Link
            key={link.href}
            to={link.href}
            className="font-body text-sm tracking-wide hover:text-primary transition-colors text-[hsl(var(--accent))]">
              {link.label}
            </Link>
          )}
          <Link
            to="/online-ordering"
            className="inline-flex items-center gap-1.5 border border-primary/40 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/5 transition-colors">
            <ShoppingBag className="w-3.5 h-3.5" />
            Order Online
          </Link>
          <a
            href="tel:+19541234567"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}>
          
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open &&
        <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="md:hidden bg-background/98 backdrop-blur-md border-t border-border">

          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) =>
          <Link
            key={link.href}
            to={link.href}
            onClick={() => setOpen(false)}
            className="font-body text-base text-foreground/80 hover:text-primary transition-colors">
                {link.label}
              </Link>
          )}
            <Link
              to="/online-ordering"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 border border-primary/40 text-primary px-5 py-3 rounded-full text-sm font-medium justify-center">
              <ShoppingBag className="w-4 h-4" />
              Order Online — Coming Soon
            </Link>
            <a
            href="tel:+19541234567"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full text-sm font-medium">
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </motion.div>
        }
      </AnimatePresence>
    </nav>);

}