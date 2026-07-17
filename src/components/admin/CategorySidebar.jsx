import React, { useState } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { base44 } from "@/api/base44Client";

function slugify(label) {
  return label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

export default function CategorySidebar({ categories, items, activeCategory, onSelect, onSaved }) {
  const [adding, setAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!newLabel.trim()) return;
    setSaving(true);
    const slug = slugify(newLabel);
    const existing = categories.find((c) => c.category_id === slug);
    const finalSlug = existing ? `${slug}_${Date.now()}` : slug;
    await base44.entities.MenuCategory.create({
      category_id: finalSlug,
      label: newLabel.trim(),
      sort_order: categories.length + 1,
      is_active: true,
    });
    setSaving(false);
    setNewLabel("");
    setAdding(false);
    onSaved(finalSlug);
  };

  const handleEditSave = async (cat) => {
    if (!editLabel.trim()) return;
    setSaving(true);
    await base44.entities.MenuCategory.update(cat.id, { label: editLabel.trim() });
    setSaving(false);
    setEditingId(null);
    onSaved();
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Delete "${cat.label}" and all its items?`)) return;
    setSaving(true);
    await base44.entities.MenuItem.deleteMany({ category: cat.category_id });
    await base44.entities.MenuCategory.delete(cat.id);
    setSaving(false);
    const remaining = categories.filter((c) => c.id !== cat.id);
    onSaved(remaining[0]?.category_id || null);
  };

  const sorted = [...categories].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <div className="space-y-1">
      <button
        onClick={() => setAdding(true)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-body border border-dashed border-border hover:bg-secondary/50 transition-colors mb-2"
      >
        <Plus className="w-4 h-4" /> Add Category
      </button>

      {adding && (
        <div className="flex gap-1 mb-2">
          <input
            autoFocus
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Category name"
            className="flex-1 px-2 py-1.5 rounded-lg text-sm border border-border bg-background"
          />
          <button onClick={handleAdd} disabled={saving} className="p-1.5 rounded-lg bg-primary text-primary-foreground">
            <Check className="w-4 h-4" />
          </button>
          <button onClick={() => { setAdding(false); setNewLabel(""); }} className="p-1.5 rounded-lg bg-secondary">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {sorted.map((cat) => {
        const count = items.filter((i) => i.category === cat.category_id).length;
        const isActive = activeCategory === cat.category_id;
        return (
          <div
            key={cat.id}
            className={`flex items-center rounded-lg group ${isActive ? "bg-primary" : "hover:bg-secondary"}`}
          >
            {editingId === cat.id ? (
              <div className="flex gap-1 flex-1 px-2 py-1.5">
                <input
                  autoFocus
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEditSave(cat)}
                  className="flex-1 px-2 py-1 rounded text-sm border border-border bg-background text-foreground"
                />
                <button onClick={() => handleEditSave(cat)} disabled={saving} className="p-1 rounded bg-primary-foreground/20">
                  <Check className="w-3.5 h-3.5 text-primary-foreground" />
                </button>
                <button onClick={() => setEditingId(null)} className="p-1 rounded bg-primary-foreground/20">
                  <X className="w-3.5 h-3.5 text-primary-foreground" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onSelect(cat.category_id)}
                  className={`flex-1 text-left px-3 py-2 text-sm font-body flex justify-between items-center ${isActive ? "text-primary-foreground" : "text-foreground"}`}
                >
                  <span className="truncate">{cat.label}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ml-2 ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {count}
                  </span>
                </button>
                <button
                  onClick={() => { setEditingId(cat.id); setEditLabel(cat.label); }}
                  className={`p-1.5 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "text-primary-foreground hover:bg-primary-foreground/20" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cat)}
                  className={`p-1.5 mr-1 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "text-primary-foreground hover:bg-primary-foreground/20" : "text-destructive/60 hover:text-destructive"}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}