import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { trackEvent, EVENTS } from "@/lib/analytics";

const ORDER_URL = "https://getsauce.com/order/ba-li-cafe/menu?utm_source=wp-site&utm_medium=order-now";

export default function FloatingOrderButton() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent(EVENTS.ONLINE_ORDER_CLICK)}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3.5 rounded-full font-body font-medium text-sm shadow-xl hover:bg-primary/90 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          Order Online
        </motion.a>
      )}
    </AnimatePresence>
  );
}