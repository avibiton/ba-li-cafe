import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function MenuSection() {
  const [active, setActive] = useState(null);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const activeItems = items
    .filter((i) => i.category === active && i.is_available !== false)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <section id="menu" className="py-24 md:py-32 bg-card px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.25em] uppercase text-primary mb-4">Our Menu</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
            Crafted with <span className="italic">Passion</span>
          </h2>
          <p className="font-body text-muted-foreground mt-3 text-sm">
            All paninis served with house salad. Add coffee or OJ to any breakfast for $4.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-14">
              {categories.map((cat) => (
                <button
                  key={cat.category_id}
                  onClick={() => setActive(cat.category_id)}
                  className={`px-4 py-2 rounded-full font-body text-sm transition-all duration-300 ${
                    active === cat.category_id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {activeItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-background rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-heading text-base font-semibold leading-snug">{item.name}</h3>
                      {item.price && (
                        <span className="font-heading text-base font-semibold text-primary whitespace-nowrap">
                          {item.price}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="font-body text-xs text-muted-foreground leading-relaxed mt-1.5">
                        {item.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        <div className="text-center mt-12">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-body font-medium hover:bg-primary/90 transition-colors"
          >
            View Full Menu with Photos →
          </Link>
        </div>
      </div>
    </section>
  );
}