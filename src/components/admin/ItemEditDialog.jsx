import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload, ImageOff, Loader2, X } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function ItemEditDialog({ open, item, categoryId, itemCount, onClose, onSaved }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setName(item.name || "");
      setPrice(item.price || "");
      setDescription(item.description || "");
      setImageUrl(item.image_url || "");
      setIsAvailable(item.is_available !== false);
    } else {
      setName("");
      setPrice("");
      setDescription("");
      setImageUrl("");
      setIsAvailable(true);
    }
  }, [item, open]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setImageUrl(file_url);
    setUploading(false);
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const data = {
      category: categoryId,
      name: name.trim(),
      price: price.trim(),
      description: description.trim(),
      image_url: imageUrl,
      is_available: isAvailable,
    };
    if (item?.id) {
      await base44.entities.MenuItem.update(item.id, data);
    } else {
      await base44.entities.MenuItem.create({ ...data, sort_order: itemCount + 1 });
    }
    setSaving(false);
    onSaved();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Item" : "Add Menu Item"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-lg bg-muted overflow-hidden flex items-center justify-center border border-border flex-shrink-0 relative">
              {imageUrl ? (
                <>
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button onClick={() => setImageUrl("")} className="absolute top-1 right-1 bg-background/80 rounded-full p-1">
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <ImageOff className="w-6 h-6 text-muted-foreground/40" />
              )}
            </div>
            <div className="flex flex-col justify-center gap-2">
              <label className="inline-flex items-center gap-2 cursor-pointer bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm hover:bg-secondary/80 transition-colors">
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {uploading ? "Uploading..." : "Upload Image"}
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
              </label>
              <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Shakshuka" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="price">Price</Label>
            <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. $18.95" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ingredients, serving details..." rows={3} />
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={isAvailable} onCheckedChange={setIsAvailable} id="available" />
            <Label htmlFor="available">Available on menu</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving || !name.trim()}>
            {saving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving...</> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}