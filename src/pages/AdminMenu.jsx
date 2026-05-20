import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Pencil, Trash2, Plus, Upload, X, Check, ArrowLeft, ImageOff } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { id: "bites", label: "BA-LI Bites" },
  { id: "breakfast", label: "BA-LI Breakfast" },
  { id: "toast", label: "BA-LI Toast" },
  { id: "salat", label: "BA-LI Salat" },
  { id: "pasta", label: "BA-LI Pasta" },
  { id: "dinner", label: "BA-LI Dinner" },
  { id: "side", label: "BA-LI Side" },
  { id: "juice", label: "BA-LI Juice" },
  { id: "smoothie", label: "BA-LI Smoothie" },
  { id: "hot_drinks", label: "Hot Drinks" },
  { id: "cold_drinks", label: "Cold Drinks" },
  { id: "milkshakes", label: "Milkshakes" },
  { id: "kids", label: "Kids Menu" },
  { id: "sweet", label: "BA-LI Sweet" },
];

const EMPTY_FORM = { category: "bites", name: "", description: "", price: "", image_url: "", is_available: true };

function ImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    onChange(file_url);
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">Photo</label>
      <div className="flex gap-3 items-start">
        <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0 border border-border">
          {value ? (
            <img src={value} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <ImageOff className="w-6 h-6 text-muted-foreground/40" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <label className="inline-flex items-center gap-2 cursor-pointer bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-body hover:bg-secondary/80 transition-colors">
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading..." : "Upload Photo"}
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
          </label>
          {value && (
            <button onClick={() => onChange("")} className="flex items-center gap-1 text-xs text-destructive hover:underline">
              <X className="w-3 h-3" /> Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ItemForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.name || !form.category) return;
    setSaving(true);
    if (form.id) {
      await base44.entities.MenuItem.update(form.id, form);
    } else {
      await base44.entities.MenuItem.create(form);
    }
    setSaving(false);
    onSave();
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <h3 className="font-heading text-lg font-semibold">{form.id ? "Edit Item" : "Add New Item"}</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Item Name *</label>
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Beet Carpaccio"
            className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={2}
            placeholder="Short description..."
            className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="e.g. $14.95"
            className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-3 pt-5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_available}
              onChange={(e) => set("is_available", e.target.checked)}
              className="rounded border-input w-4 h-4 accent-primary"
            />
            <span className="text-sm font-medium">Available</span>
          </label>
        </div>
      </div>

      <ImageUploader value={form.image_url} onChange={(v) => set("image_url", v)} />

      <div className="flex gap-3 pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          <Check className="w-4 h-4" />
          {saving ? "Saving..." : "Save Item"}
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("bites");
  const [editing, setEditing] = useState(null); // item or "new"
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.MenuItem.list();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    await base44.entities.MenuItem.delete(id);
    load();
  };

  const categoryItems = items.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background px-5 md:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/home" className="inline-flex items-center gap-2 text-background/60 hover:text-background text-sm font-body mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </Link>
          <h1 className="font-heading text-3xl font-bold text-background">Menu Admin</h1>
          <p className="font-body text-background/60 text-sm mt-1">Upload photos and manage menu items</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - categories */}
          <div className="md:w-48 flex-shrink-0">
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const count = items.filter((i) => i.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setEditing(null); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors flex justify-between items-center ${
                      activeCategory === cat.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {count > 0 && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-semibold">
                {CATEGORIES.find((c) => c.id === activeCategory)?.label}
              </h2>
              {editing !== "new" && (
                <button
                  onClick={() => setEditing("new")}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              )}
            </div>

            {/* Add form */}
            {editing === "new" && (
              <div className="mb-6">
                <ItemForm
                  initial={{ ...EMPTY_FORM, category: activeCategory }}
                  onSave={() => { setEditing(null); load(); }}
                  onCancel={() => setEditing(null)}
                />
              </div>
            )}

            {/* Items list */}
            {loading ? (
              <div className="text-center py-12 text-muted-foreground font-body text-sm">Loading...</div>
            ) : categoryItems.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <ImageOff className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="font-body text-muted-foreground text-sm">No items added yet for this category.</p>
                <p className="font-body text-muted-foreground/60 text-xs mt-1">Click "Add Item" to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {categoryItems.map((item) =>
                  editing?.id === item.id ? (
                    <ItemForm
                      key={item.id}
                      initial={item}
                      onSave={() => { setEditing(null); load(); }}
                      onCancel={() => setEditing(null)}
                    />
                  ) : (
                    <div key={item.id} className="bg-card rounded-xl border border-border p-4 flex gap-4 items-start">
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden flex items-center justify-center">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageOff className="w-5 h-5 text-muted-foreground/40" />
                        )}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-heading font-semibold text-sm">{item.name}</span>
                          {item.price && <span className="text-primary font-heading font-semibold text-sm">{item.price}</span>}
                          {!item.is_available && (
                            <span className="bg-destructive/10 text-destructive text-xs px-2 py-0.5 rounded-full">Unavailable</span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                        )}
                        {!item.image_url && (
                          <p className="text-xs text-accent mt-1">⚠ No photo — click Edit to upload</p>
                        )}
                      </div>
                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => setEditing(item)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}