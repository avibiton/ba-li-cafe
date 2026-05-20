import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Pencil, Upload, X, Check, ArrowLeft, ImageOff } from "lucide-react";
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

const STATIC_ITEMS = {
  bites: [
    { name: "Bread Basket", price: "$9.95" },
    { name: "Shishito Bites", description: "Blistered shishito peppers tossed in olive oil, sea salt & lemon", price: "$13.95" },
    { name: "Nachos", description: "Served with salsa, sour cream and guacamole", price: "$18.95" },
    { name: "Mozzarella Sticks", description: "Served with home-made tomato sauce", price: "$16.95" },
    { name: "Bruschetta Toast", description: "Freshly toasted sourdough topped with tomatoes, garlic, fresh herbs, olive oil & balsamic glaze", price: "$14.95" },
    { name: "Crispy Cauliflower", description: "Freshly fried golden cauliflower served with sweet chili sauce", price: "$15.95" },
    { name: "Beet Carpaccio", description: "Thin sliced beets topped with cheese, crushed pistachio, and fresh dill", price: "$19.95" },
    { name: "Parmesan Truffle Fries", description: "Crispy fries tossed with parmesan, truffle oil, parsley & sea salt", price: "$12.95" },
    { name: "Grilled Halloumi Bites", description: "Grilled halloumi cheese served with mixed greens and drizzled with dill and honey", price: "$15.95" },
    { name: "Grilled Eggplant", description: "Served with tahini sauce", price: "$15.95" },
  ],
  breakfast: [
    { name: "Boker Tov", description: "2 eggs your way served with Israeli salad, Jerusalem bagel, tuna salad, olive spread, tzatziki, and olives", price: "$16.95" },
    { name: "BA-LI Omelette", description: "2 egg omelet filled with spinach, onion, mushroom, dill, and feta cheese. Served with Israeli salad", price: "$15.95" },
    { name: "The Brooklyn", description: "Smoked lox on everything bagel with cream cheese, dill & pickled red onion", price: "$17.95" },
    { name: "Yalla Avocado", description: "Mashed avocado on toasted sourdough topped with sunny side up egg and pickled red onion", price: "$16.95" },
    { name: "BA-LI Shakshuka", description: "2 eggs with a Moroccan tomato sauce served with Israeli salad and toasted bread. Add feta or eggplant +$3", price: "$18.95" },
    { name: "Breakfast Sandwich", description: "Panini with omelet, mozzarella cheese, tomato, and avocado. Served with Israeli salad", price: "$16.95" },
    { name: "Paris Breakfast", description: "Two scrambled eggs on a fresh croissant served with Israeli salad", price: "$16.95" },
    { name: "French Toast", description: "Challah french toast with fresh berries and maple syrup", price: "$15.95" },
  ],
  toast: [
    { name: "The OG Tuna", description: "Tuna salad, pickle, tomato and mozzarella cheese", price: "$17.95" },
    { name: "Pesto Paradise", description: "Fresh mozzarella, pesto, and roasted pepper and portobello mushrooms", price: "$17.95" },
    { name: "FetaAvoo Panini", description: "Feta, avocado, hard boiled egg and tomato", price: "$17.95" },
    { name: "Say Cheese!", description: "Mozzarella, cheddar, and feta", price: "$16.95" },
    { name: "Lox Panini", description: "Lox, mozzarella cheese, and red onion", price: "$20.95" },
    { name: "Pizza Panini", description: "Tomato sauce, green olives, and mozzarella cheese", price: "$16.95" },
    { name: "Vegetarian Panini", description: "Avocado, roasted pepper, mushroom, eggplant, and fresh basil pesto", price: "$17.95" },
    { name: "Baladi Panini", description: "Eggplant, tomato sauce, and feta cheese", price: "$17.95" },
    { name: "Mushroom Lovers", description: "Mozzarella cheese mushroom panini with cream house mushroom sauce on top", price: "$18.95" },
    { name: "BA-LI Sabich", description: "Pita bread with fried eggplant, tahini, hard boiled egg, Israeli salad and pickle", price: "$16.95" },
  ],
  salat: [
    { name: "Israeli Salad", description: "Classic Israeli house salad with fresh cucumber, tomato, onion and parsley", price: "$15.95" },
    { name: "House Caesar", description: "Lettuce, parmesan, and topped with housemade croutons mixed with creamy caesar dressing", price: "$16.95" },
    { name: "Salat Tuna", description: "Lettuce, tomato, cucumber, onion, corn, hard boiled egg and tuna. Mixed with pesto dressing", price: "$18.95" },
    { name: "Avocado Salad", description: "Lettuce, cherry tomato, cucumbers, corn, red onion, kalamata olives, and croutons mixed with creamy pesto", price: "$18.95" },
    { name: "Big Fat Greek", description: "Lettuce, tomato, onion, cucumber, red pepper, kalamata olives topped with feta and dill. Mixed with olive oil & lemon", price: "$18.95" },
    { name: "Quinoa Salad", description: "Mixed greens with quinoa, mushroom, cranberries, toasted almonds, avocado, and red pepper. Mixed with olive oil & lemon juice", price: "$18.95" },
    { name: "The Boom Salad", description: "Lettuce, cucumbers, tomato, corn, onion, olives, tuna & feta with avocado on top. Mixed with pesto dressing", price: "$19.95" },
    { name: "Beet Salad", description: "Mixed greens, with beets, goat cheese, fresh dill, and toasted almonds. Mixed with house balsamic", price: "$18.95" },
    { name: "Fried Cheese Salad", description: "Lettuce, fresh mushrooms, cherry tomato, corn, olives, onion with fried mozzarella balls. Mix with honey mustard house dressing", price: "$18.95" },
    { name: "Grilled Salmon Salad", description: "Mixed greens, cherry tomato, cucumber, red onion, avocado, and fresh grilled salmon", price: "$25.95" },
    { name: "Asiati Salad", description: "Roasted pepper, corn, carrots, broccoli, mushrooms, pecans and bean sprouts mixed with our Asian dressing served with sesame on top (served hot)", price: "$19.95" },
  ],
  pasta: [
    { name: "Penne Vodka", description: "Penne pasta with creamy housemade tomato-vodka sauce", price: "$21.95" },
    { name: "Classic Ziti", description: "Classic baked ziti with melted cheese and rich housemade tomato sauce", price: "$22.95" },
    { name: "Truffle Lover", description: "Spaghetti tossed in truffle oil with mushrooms, roasted pepper and parmesan cheese", price: "$23.95" },
    { name: "Holy Pesto", description: "Penne pasta tossed with a creamy pesto sauce, cherry tomatoes, and topped with parmesan", price: "$22.95" },
    { name: "BA-LI Ravioli", description: "Cheese ravioli with either creamy pesto, penne vodka, or marinara", price: "$24.95" },
    { name: "Classic Alfredo", description: "Fettucini pasta tossed in a housemade mushroom cream sauce", price: "$23.95" },
    { name: "Opa Pasta", description: "Spaghetti with tomato sauce, kalamata olives, mushroom, and feta cheese", price: "$22.95" },
    { name: "The Veggie", description: "Penne pasta tossed in olive oil, garlic, spinach, roasted pepper, and mushrooms", price: "$22.95" },
  ],
  dinner: [
    { name: "Tuna Fish Shawarma", description: "Our home-made tuna shawarma served with mashed potato", price: "$25.95" },
    { name: "Baked Potato with Cream Mushroom & Cheese", description: "Served with Israeli salad", price: "$23.95" },
    { name: "Baked Potato with Broccoli & Cheese", description: "Served with Israeli salad", price: "$23.95" },
    { name: "Fish & Chips", price: "$23.95" },
    { name: "Fish Sandwich", description: "Crispy fish schnitzel served with fries, Israeli salad and fresh lemon", price: "$25.95" },
    { name: "BA-Li Branzino", description: "Filleted branzino served with a lemon sauce and grilled vegetables", price: "$29.95" },
    { name: "Grilled Salmon Platter", description: "Grilled salmon served with a lemon sauce and grilled vegetables", price: "$28.95" },
    { name: "Moroccan Fish", description: "Salmon cooked in a Moroccan sauce served with fresh challah bread", price: "$27.95" },
    { name: "Impossible Burger", description: "Vegan burger served with tomatoes, onion, pickles, ketchup and mayo. Served with french fries. Add cheese +$3", price: "$22.95" },
  ],
  side: [
    { name: "Side of Israeli Salad", price: "$9.95" },
    { name: "French Fries or Sweet Potato Fries", price: "$10.95" },
    { name: "Side of Grilled Salmon", price: "$14.95" },
    { name: "Side of Sliced Avocado", price: "$5.00" },
    { name: "Side of Feta Cheese", price: "$5.00" },
    { name: "Scoop of Tuna", price: "$6.00" },
  ],
  juice: [
    { name: "Tapuzeem", description: "Freshly squeezed OJ", price: "$9.95" },
    { name: "Booster", description: "Freshly squeezed beets, apples, carrots, and celery", price: "$11.95" },
    { name: "Green Girl", description: "Celery, apple, spinach, cucumber", price: "$10.95" },
    { name: "Apple Lovers", description: "Fresh squeezed apple juice", price: "$11.95" },
    { name: "Grapefruit", description: "Freshly squeezed grapefruit juice", price: "$9.95" },
    { name: "Lemonade", price: "$9.95" },
    { name: "Lemonana", price: "$11.95" },
    { name: "Veggie Juice", description: "Carrot, celery, apple, beets", price: "$11.95" },
    { name: "Gezer", description: "Freshly squeezed carrot juice", price: "$10.95" },
    { name: "Ginger Shotz", description: "Freshly squeezed ginger shots", price: "$5.95" },
    { name: "Shemesh", description: "Juice made with ginger, lemon, pineapple, orange and honey", price: "$11.95" },
    { name: "Your Way", description: "Your choice of four ingredients: orange, grapefruit, pineapple, lemon, carrot, beet, celery, spinach, cucumber, ginger, and honey", price: "$12.95" },
  ],
  smoothie: [
    { name: "Fruity Smoothie", description: "Strawberry, pineapple, mango, banana, milk", price: "$12.95" },
    { name: "Toot Banana", description: "Strawberry, banana, choice of whole milk or almond milk", price: "$12.95" },
    { name: "Shoko Banana", description: "Cocoa powder, peanut butter, banana, choice of whole milk or almond milk", price: "$12.95" },
    { name: "The Miami", description: "Orange, mango, pineapple", price: "$12.95" },
    { name: "Tropical", description: "Mango, banana, pineapple, honey, and almond milk", price: "$12.95" },
    { name: "The Berry", description: "Blueberries, strawberries, milk base", price: "$12.95" },
  ],
  hot_drinks: [
    { name: "Israeli Nescafe (milk base)", price: "$4.95" },
    { name: "Americano", price: "$4.95" },
    { name: "Coffee", price: "$3.95" },
    { name: "Cappuccino", price: "$4.95" },
    { name: "Latte", price: "$4.95" },
    { name: "Espresso Shot", price: "$3.95" },
    { name: "Hot Chocolate with Whipped Cream", price: "$5.95" },
    { name: "Tea", price: "$3.95" },
    { name: "Herbal Tea", description: "Ask us for our collection", price: "$4.50" },
  ],
  cold_drinks: [
    { name: "Iced Coffee", price: "$6.95" },
    { name: "Iced Cappuccino", price: "$9.95" },
    { name: "Slush Coffee (non sweet)", price: "$11.95" },
    { name: "BA-LI Coffee", description: "Slush coffee with ice cream and flavor", price: "$12.95" },
    { name: "Salted Caramel Macchiato", price: "$11.95" },
    { name: "Iced Chocolate", price: "$7.95" },
    { name: "Slush Chocolate with Ice Cream", price: "$12.95" },
    { name: "Soda", price: "$2.95" },
    { name: "Snapple", price: "$4.95" },
    { name: "Bottle of Water", price: "$2.95" },
    { name: "Big Bottle Water or Sparkling", price: "$7.95" },
  ],
  milkshakes: [
    { name: "Vanilla", description: "Served with whipped cream", price: "$12.95" },
    { name: "Chocolate", description: "Served with whipped cream", price: "$12.95" },
    { name: "Strawberry", description: "Served with whipped cream", price: "$12.95" },
    { name: "Cookies & Cream", description: "Served with whipped cream", price: "$12.95" },
    { name: "Moca", description: "Served with whipped cream", price: "$12.95" },
    { name: "Chocolate & Vanilla", description: "Served with whipped cream", price: "$12.95" },
    { name: "Vanilla & Strawberry", description: "Served with whipped cream", price: "$12.95" },
    { name: "Moca & Vanilla", description: "Served with whipped cream", price: "$12.95" },
  ],
  kids: [
    { name: "Scrambled Eggs with Toast", price: "$10.95" },
    { name: "Sourdough Grilled Cheese", price: "$10.95" },
    { name: "Penne Pasta with Tomato Sauce", description: "Add cheese +$3", price: "$12.95" },
    { name: "Pancakes", price: "$14.95" },
    { name: "Pizza Bagel", price: "$14.95" },
    { name: "1 Scoop of Ice Cream", price: "$4.95" },
  ],
  sweet: [
    { name: "Chocolate Soufflé", description: "Served with vanilla ice cream", price: "$19.95" },
    { name: "Waffaliko", description: "Belgian waffle with 3 scoops of your choice of ice cream and lots of whipped cream (great for sharing)", price: "$24.95" },
    { name: "Crumbs Everywhere", description: "Homemade cheesecake with a lot of crumbs", price: "$12.95" },
    { name: "Tiramisu", price: "$12.95" },
    { name: "Chocolate Bites", description: "Go back to your childhood with these chocolate balls", price: "" },
    { name: "Fresh and Creamy", description: "Strawberries with homemade whipped cream", price: "$12.95" },
    { name: "Apple Pie", description: "Served with vanilla ice cream (contains cinnamon)", price: "$12.95" },
    { name: "After Dinner-tini", description: "3 scoops of your choice of ice cream in an oversized martini glass and lots of whipped cream", price: "$14.95" },
    { name: "Halva Lovers", description: "Scoop of vanilla ice cream with halva, silan and pecans", price: "$15.95" },
    { name: "Affogato", description: "Scoop of creamy vanilla ice cream with a shot of espresso", price: "$8.95" },
  ],
};

// Build a unique key for each static item
function itemKey(category, name) {
  return `${category}__${name.toLowerCase()}`;
}

function ItemRow({ category, item, dbItem, onSaved }) {
  const [editing, setEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(dbItem?.image_url || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Keep in sync if parent reloads
  useEffect(() => {
    setImageUrl(dbItem?.image_url || "");
  }, [dbItem?.image_url]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setImageUrl(file_url);
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    if (dbItem?.id) {
      await base44.entities.MenuItem.update(dbItem.id, { image_url: imageUrl });
    } else {
      await base44.entities.MenuItem.create({
        category,
        name: item.name,
        description: item.description || "",
        price: item.price || "",
        image_url: imageUrl,
        is_available: true,
      });
    }
    setSaving(false);
    setEditing(false);
    onSaved();
  };

  const handleRemoveImage = async () => {
    setImageUrl("");
    if (dbItem?.id) {
      await base44.entities.MenuItem.update(dbItem.id, { image_url: "" });
      onSaved();
    }
  };

  const currentImage = editing ? imageUrl : (dbItem?.image_url || "");

  return (
    <div className="bg-card rounded-xl border border-border p-4 flex gap-4 items-start">
      {/* Thumbnail / uploader */}
      <div className="flex-shrink-0">
        {editing ? (
          <div className="space-y-2">
            <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden flex items-center justify-center border border-border">
              {imageUrl ? (
                <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <ImageOff className="w-5 h-5 text-muted-foreground/40" />
              )}
            </div>
            <label className="flex items-center gap-1.5 cursor-pointer bg-secondary text-secondary-foreground px-2 py-1.5 rounded-lg text-xs font-body hover:bg-secondary/80 transition-colors w-20 justify-center">
              <Upload className="w-3 h-3" />
              {uploading ? "..." : "Upload"}
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
            {imageUrl && (
              <button onClick={() => setImageUrl("")} className="flex items-center gap-1 text-xs text-destructive hover:underline w-20 justify-center">
                <X className="w-3 h-3" /> Remove
              </button>
            )}
          </div>
        ) : (
          <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden flex items-center justify-center border border-border">
            {currentImage ? (
              <img src={currentImage} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <ImageOff className="w-5 h-5 text-muted-foreground/30" />
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-heading font-semibold text-sm">{item.name}</span>
          {item.price && <span className="text-primary font-heading font-semibold text-sm">{item.price}</span>}
          {!currentImage && !editing && (
            <span className="bg-accent/20 text-accent-foreground text-xs px-2 py-0.5 rounded-full">No photo</span>
          )}
          {currentImage && !editing && (
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">✓ Has photo</span>
          )}
        </div>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-shrink-0">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              <Check className="w-3 h-3" />
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => { setEditing(false); setImageUrl(dbItem?.image_url || ""); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Pencil className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function AdminMenu() {
  const [dbItems, setDbItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("bites");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.MenuItem.list();
    setDbItems(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const staticItems = STATIC_ITEMS[activeCategory] || [];
  const categoryDbItems = dbItems.filter((d) => d.category === activeCategory);

  const withDb = staticItems.map((item) => ({
    item,
    dbItem: categoryDbItems.find((d) => d.name.toLowerCase() === item.name.toLowerCase()),
  }));

  const withPhotoCount = categoryDbItems.filter((d) => d.image_url).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background px-5 md:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/home" className="inline-flex items-center gap-2 text-background/60 hover:text-background text-sm font-body mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </Link>
          <h1 className="font-heading text-3xl font-bold text-background">Menu Photo Admin</h1>
          <p className="font-body text-background/60 text-sm mt-1">Upload photos for each menu item</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-52 flex-shrink-0">
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const catDbItems = dbItems.filter((i) => i.category === cat.id);
                const total = (STATIC_ITEMS[cat.id] || []).length;
                const photos = catDbItems.filter((i) => i.image_url).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors flex justify-between items-center ${
                      activeCategory === cat.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeCategory === cat.id ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {photos}/{total}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-heading text-xl font-semibold">
                  {CATEGORIES.find((c) => c.id === activeCategory)?.label}
                </h2>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  {withPhotoCount} of {staticItems.length} items have photos
                </p>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground font-body text-sm">Loading...</div>
            ) : (
              <div className="space-y-3">
                {withDb.map(({ item, dbItem }) => (
                  <ItemRow
                    key={itemKey(activeCategory, item.name)}
                    category={activeCategory}
                    item={item}
                    dbItem={dbItem}
                    onSaved={load}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}