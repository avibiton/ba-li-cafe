import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { trackEvent, EVENTS } from "@/lib/analytics";

const HERO_IMAGES = [
  "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/c2b7a1dba_BALIbyadirnaphotography-45.JPG",
  "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/3ab1f29db_BALIbyadirnaphotography-14.JPG",
  "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/c76b9543a_BALIbyadirnaphotography-25.JPG",
];
const SLIDE_INTERVAL = 5000;

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={index}
            src={HERO_IMAGES[index]}
            alt="BALI Cafe signature dishes"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-white/70 mb-4">
            Kosher · Chalav Yisrael · Hollywood, Florida
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6">
            BALI Cafe
          </h1>
          <p className="font-heading text-xl sm:text-2xl text-white/85 italic mb-10">
            Israeli food that tastes just like home
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#menu"
            onClick={() => trackEvent(EVENTS.MENU_VIEW)}
            className="bg-white text-foreground px-8 py-3.5 rounded-full font-body font-medium text-sm tracking-wide hover:bg-white/90 transition-colors"
          >
            View Menu
          </a>
          <a
            href="https://getsauce.com/order/ba-li-cafe/menu"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(EVENTS.ONLINE_ORDER_CLICK)}
            className="border border-white/50 text-white px-8 py-3.5 rounded-full font-body font-medium text-sm tracking-wide hover:bg-white/10 transition-colors"
          >
            Order Now
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}