import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { trackEvent, EVENTS } from "@/lib/analytics";

export default function OnlineOrdering() {
  useSEO({
    title: "Order Online | BA-LI Cafe — Hollywood, FL Kosher Dairy Restaurant",
    description:
      "Order online from BA-LI Cafe — kosher dairy restaurant in Hollywood, FL. Call (754) 444-3770 to place your takeout order. Israeli breakfast, salads, pasta, sushi & more.",
  });
  return (
    <div className="min-h-screen font-body flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-5 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-9 h-9 text-primary" />
          </div>
          <p className="font-body text-sm tracking-[0.25em] uppercase text-primary mb-4">
            Coming Soon
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold mb-6">
            Online Ordering
          </h1>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            We're working on making it easy to order your favorite Israeli dishes online.
            In the meantime, give us a call and we'll take care of you.
          </p>
          <a
            href="tel:+17544443770"
            onClick={() => trackEvent(EVENTS.PHONE_TAP)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-body font-medium hover:bg-primary/90 transition-colors"
          >
            Call to Order
          </a>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}