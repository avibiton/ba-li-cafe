import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ImageOff, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ImageLightbox from "@/components/ImageLightbox";
import { useSEO } from "@/lib/seo";
import { trackEvent, EVENTS } from "@/lib/analytics";

const BG_URL = "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/25be153bd_WhatsAppImage2026-04-27at1224361.jpg";

function MenuItemCard({ item, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
    >
      <div className="w-full h-44 bg-muted flex items-center justify-center overflow-hidden">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            onClick={() => onOpen(item.image_url, item.name)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
            <ImageOff className="w-8 h-8" />
            <span className="text-xs font-body">Photo coming soon</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-heading text-base font-semibold leading-snug">{item.name}</h3>
          {item.price && <span className="font-heading text-base font-semibold text-primary whitespace-nowrap">{item.price}</span>}
        </div>
        {item.description && <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.description}</p>}
      </div>
    </motion.div>
  );
}

export default function MenuPage() {
  const [active, setActive] = useState(null);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, image: null, alt: null });

  useSEO({
    title: "Menu | Chalav Yisrael Kosher Dairy Restaurant, Hollywood FL",
    description:
      "View the BALI Cafe menu — kosher dairy Israeli cuisine in Hollywood, FL. Breakfast, salads, paninis, pasta, sushi, juices, smoothies, coffee & desserts. Chalav Yisrael.",
  });

  useEffect(() => {
    const load = async () => {
      const cats = await base44.entities.MenuCategory.filter({ is_active: true });
      const sortedCats = cats.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
      setCategories(sortedCats);
      if (sortedCats.length > 0) setActive(sortedCats[0].category_id);

      const menuItems = await base44.entities.MenuItem.list();
      setItems(menuItems);
      setLoading(false);
    };
    load().catch(() => setLoading(false));
    trackEvent(EVENTS.MENU_VIEW);
  }, []);

  const activeItems = items
    .filter((i) => i.category === active && i.is_available !== false)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative py-24 px-5 md:px-8 overflow-hidden">
        <img src={BG_URL} alt="BALI Cafe" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        <div className="relative max-w-7xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3">BALI Menu</h1>
          <p className="font-body text-white/60 text-sm">Dairy Restaurant · Chalav Yisrael · Hollywood, Florida</p>
        </div>
      </div>

      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border px-5 md:px-8 py-4">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.category_id}
                onClick={() => setActive(cat.category_id)}
                className={`px-4 py-2 rounded-full font-body text-sm whitespace-nowrap transition-all duration-200 ${
                  active === cat.category_id
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-heading text-2xl font-semibold mb-8">
                {categories.find((c) => c.category_id === active)?.label}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {activeItems.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onOpen={(image, alt) => setLightbox({ open: true, image, alt })}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <ImageLightbox
        image={lightbox.image}
        alt={lightbox.alt}
        open={lightbox.open}
        onClose={() => setLightbox({ ...lightbox, open: false })}
      />
    </div>
  );
}