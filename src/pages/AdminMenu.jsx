import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Loader2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import CategorySidebar from "@/components/admin/CategorySidebar";
import ItemTable from "@/components/admin/ItemTable";

export default function AdminMenu() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  const load = async (selectId) => {
    const cats = await base44.entities.MenuCategory.list();
    const sortedCats = cats.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    setCategories(sortedCats);

    const menuItems = await base44.entities.MenuItem.list();
    setItems(menuItems);

    if (selectId !== undefined) {
      setActiveCategory(selectId);
    } else if (!activeCategory && sortedCats.length > 0) {
      setActiveCategory(sortedCats[0].category_id);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const activeCat = categories.find((c) => c.category_id === activeCategory);
  const activeItems = items.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-foreground text-background px-5 md:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-background/60 hover:text-background text-sm font-body mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold text-background">Menu Admin</h1>
              <p className="font-body text-background/60 text-sm mt-1">Manage categories, items, prices & photos</p>
            </div>
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-2 border border-background/20 text-background px-4 py-2 rounded-full text-sm font-body hover:bg-background/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-56 flex-shrink-0">
              <CategorySidebar
                categories={categories}
                items={items}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
                onSaved={load}
              />
            </div>

            <div className="flex-1 min-w-0">
              {activeCat ? (
                <ItemTable
                  items={activeItems}
                  categoryId={activeCat.category_id}
                  categoryLabel={activeCat.label}
                  onSaved={() => load(activeCategory)}
                />
              ) : (
                <div className="text-center py-12 text-muted-foreground font-body text-sm">
                  No categories yet. Add one to get started.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}