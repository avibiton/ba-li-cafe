import React, { useState } from "react";
import { Plus, Pencil, Trash2, ImageOff, ChevronUp, ChevronDown } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ItemEditDialog from "./ItemEditDialog";

export default function ItemTable({ items, categoryId, categoryLabel, onSaved }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const sorted = [...items].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  const photoCount = sorted.filter((i) => i.image_url).length;

  const handleAdd = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.name}"?`)) return;
    await base44.entities.MenuItem.delete(item.id);
    onSaved();
  };

  const handleReorder = async (item, direction) => {
    const idx = sorted.findIndex((i) => i.id === item.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const swapItem = sorted[swapIdx];
    await base44.entities.MenuItem.update(item.id, { sort_order: swapItem.sort_order });
    await base44.entities.MenuItem.update(swapItem.id, { sort_order: item.sort_order });
    onSaved();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-heading text-xl font-semibold">{categoryLabel}</h2>
          <p className="font-body text-xs text-muted-foreground mt-0.5">
            {sorted.length} items · {photoCount} with photos
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      <div className="space-y-3">
        {sorted.map((item, idx) => (
          <div key={item.id} className="bg-card rounded-xl border border-border p-4 flex gap-4 items-start">
            <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden flex items-center justify-center border border-border flex-shrink-0">
              {item.image_url ? (
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <ImageOff className="w-5 h-5 text-muted-foreground/30" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-heading font-semibold text-sm">{item.name}</span>
                {item.price && <span className="text-primary font-heading font-semibold text-sm">{item.price}</span>}
                {!item.is_available && (
                  <span className="bg-destructive/10 text-destructive text-xs px-2 py-0.5 rounded-full">Unavailable</span>
                )}
                {item.image_url && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">✓ Photo</span>
                )}
              </div>
              {item.description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
              )}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="flex flex-col">
                <button onClick={() => handleReorder(item, "up")} disabled={idx === 0} className="p-1 hover:bg-secondary rounded disabled:opacity-30">
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                </button>
                <button onClick={() => handleReorder(item, "down")} disabled={idx === sorted.length - 1} className="p-1 hover:bg-secondary rounded disabled:opacity-30">
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <button onClick={() => handleEdit(item)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </button>
              <button onClick={() => handleDelete(item)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                <Trash2 className="w-4 h-4 text-destructive/60" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ItemEditDialog
        open={dialogOpen}
        item={editingItem}
        categoryId={categoryId}
        itemCount={sorted.length}
        onClose={() => setDialogOpen(false)}
        onSaved={onSaved}
      />
    </div>
  );
}