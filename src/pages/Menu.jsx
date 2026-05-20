import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { ArrowLeft, ImageOff } from "lucide-react";

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
{ id: "sweet", label: "BA-LI Sweet" }];


// Static fallback data (same as MenuSection)
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
  { name: "Grilled Eggplant", description: "Served with tahini sauce", price: "$15.95" }],

  breakfast: [
  { name: "Boker Tov", description: "2 eggs your way served with Israeli salad, Jerusalem bagel, tuna salad, olive spread, tzatziki, and olives", price: "$16.95" },
  { name: "BA-LI Omelette", description: "2 egg omelet filled with spinach, onion, mushroom, dill, and feta cheese. Served with Israeli salad", price: "$15.95" },
  { name: "The Brooklyn", description: "Smoked lox on everything bagel with cream cheese, dill & pickled red onion", price: "$17.95" },
  { name: "Yalla Avocado", description: "Mashed avocado on toasted sourdough topped with sunny side up egg and pickled red onion", price: "$16.95" },
  { name: "BA-LI Shakshuka", description: "2 eggs with a Moroccan tomato sauce served with Israeli salad and toasted bread. Add feta or eggplant +$3", price: "$18.95" },
  { name: "Breakfast Sandwich", description: "Panini with omelet, mozzarella cheese, tomato, and avocado. Served with Israeli salad", price: "$16.95" },
  { name: "Paris Breakfast", description: "Two scrambled eggs on a fresh croissant served with Israeli salad", price: "$16.95" },
  { name: "French Toast", description: "Challah french toast with fresh berries and maple syrup", price: "$15.95" }],

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
  { name: "BA-LI Sabich", description: "Pita bread with fried eggplant, tahini, hard boiled egg, Israeli salad and pickle", price: "$16.95" }],

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
  { name: "Asiati Salad", description: "Roasted pepper, corn, carrots, broccoli, mushrooms, pecans and bean sprouts mixed with our Asian dressing served with sesame on top (served hot)", price: "$19.95" }],

  pasta: [
  { name: "Penne Vodka", description: "Penne pasta with creamy housemade tomato-vodka sauce", price: "$21.95" },
  { name: "Classic Ziti", description: "Classic baked ziti with melted cheese and rich housemade tomato sauce", price: "$22.95" },
  { name: "Truffle Lover", description: "Spaghetti tossed in truffle oil with mushrooms, roasted pepper and parmesan cheese", price: "$23.95" },
  { name: "Holy Pesto", description: "Penne pasta tossed with a creamy pesto sauce, cherry tomatoes, and topped with parmesan", price: "$22.95" },
  { name: "BA-LI Ravioli", description: "Cheese ravioli with either creamy pesto, penne vodka, or marinara", price: "$24.95" },
  { name: "Classic Alfredo", description: "Fettucini pasta tossed in a housemade mushroom cream sauce", price: "$23.95" },
  { name: "Opa Pasta", description: "Spaghetti with tomato sauce, kalamata olives, mushroom, and feta cheese", price: "$22.95" },
  { name: "The Veggie", description: "Penne pasta tossed in olive oil, garlic, spinach, roasted pepper, and mushrooms", price: "$22.95" }],

  dinner: [
  { name: "Tuna Fish Shawarma", description: "Our home-made tuna shawarma served with mashed potato", price: "$25.95" },
  { name: "Baked Potato with Cream Mushroom & Cheese", description: "Served with Israeli salad", price: "$23.95" },
  { name: "Baked Potato with Broccoli & Cheese", description: "Served with Israeli salad", price: "$23.95" },
  { name: "Fish & Chips", price: "$23.95" },
  { name: "Fish Sandwich", description: "Crispy fish schnitzel served with fries, Israeli salad and fresh lemon", price: "$25.95" },
  { name: "BA-Li Branzino", description: "Filleted branzino served with a lemon sauce and grilled vegetables", price: "$29.95" },
  { name: "Grilled Salmon Platter", description: "Grilled salmon served with a lemon sauce and grilled vegetables", price: "$28.95" },
  { name: "Moroccan Fish", description: "Salmon cooked in a Moroccan sauce served with fresh challah bread", price: "$27.95" },
  { name: "Impossible Burger", description: "Vegan burger served with tomatoes, onion, pickles, ketchup and mayo. Served with french fries. Add cheese +$3", price: "$22.95" }],

  side: [
  { name: "Side of Israeli Salad", price: "$9.95" },
  { name: "French Fries or Sweet Potato Fries", price: "$10.95" },
  { name: "Side of Grilled Salmon", price: "$14.95" },
  { name: "Side of Sliced Avocado", price: "$5.00" },
  { name: "Side of Feta Cheese", price: "$5.00" },
  { name: "Scoop of Tuna", price: "$6.00" }],

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
  { name: "Your Way", description: "Your choice of four ingredients: orange, grapefruit, pineapple, lemon, carrot, beet, celery, spinach, cucumber, ginger, and honey", price: "$12.95" }],

  smoothie: [
  { name: "Fruity Smoothie", description: "Strawberry, pineapple, mango, banana, milk", price: "$12.95" },
  { name: "Toot Banana", description: "Strawberry, banana, choice of whole milk or almond milk", price: "$12.95" },
  { name: "Shoko Banana", description: "Cocoa powder, peanut butter, banana, choice of whole milk or almond milk", price: "$12.95" },
  { name: "The Miami", description: "Orange, mango, pineapple", price: "$12.95" },
  { name: "Tropical", description: "Mango, banana, pineapple, honey, and almond milk", price: "$12.95" },
  { name: "The Berry", description: "Blueberries, strawberries, milk base", price: "$12.95" }],

  hot_drinks: [
  { name: "Israeli Nescafe (milk base)", price: "$4.95" },
  { name: "Americano", price: "$4.95" },
  { name: "Coffee", price: "$3.95" },
  { name: "Cappuccino", price: "$4.95" },
  { name: "Latte", price: "$4.95" },
  { name: "Espresso Shot", price: "$3.95" },
  { name: "Hot Chocolate with Whipped Cream", price: "$5.95" },
  { name: "Tea", price: "$3.95" },
  { name: "Herbal Tea", description: "Ask us for our collection", price: "$4.50" }],

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
  { name: "Big Bottle Water or Sparkling", price: "$7.95" }],

  milkshakes: [
  { name: "Vanilla", description: "Served with whipped cream", price: "$12.95" },
  { name: "Chocolate", description: "Served with whipped cream", price: "$12.95" },
  { name: "Strawberry", description: "Served with whipped cream", price: "$12.95" },
  { name: "Cookies & Cream", description: "Served with whipped cream", price: "$12.95" },
  { name: "Moca", description: "Served with whipped cream", price: "$12.95" },
  { name: "Chocolate & Vanilla", description: "Served with whipped cream", price: "$12.95" },
  { name: "Vanilla & Strawberry", description: "Served with whipped cream", price: "$12.95" },
  { name: "Moca & Vanilla", description: "Served with whipped cream", price: "$12.95" }],

  kids: [
  { name: "Scrambled Eggs with Toast", price: "$10.95" },
  { name: "Sourdough Grilled Cheese", price: "$10.95" },
  { name: "Penne Pasta with Tomato Sauce", description: "Add cheese +$3", price: "$12.95" },
  { name: "Pancakes", price: "$14.95" },
  { name: "Pizza Bagel", price: "$14.95" },
  { name: "1 Scoop of Ice Cream", price: "$4.95" }],

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
  { name: "Affogato", description: "Scoop of creamy vanilla ice cream with a shot of espresso", price: "$8.95" }]

};

function MenuItemCard({ item, dbItem }) {
  const imageUrl = dbItem?.image_url;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
      
      {/* Image area */}
      <div className="w-full h-44 bg-muted flex items-center justify-center overflow-hidden">
        {imageUrl ?
        <img src={imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> :

        <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
            <ImageOff className="w-8 h-8" />
            <span className="text-xs font-body">Photo coming soon</span>
          </div>
        }
      </div>
      {/* Info */}
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-heading text-base font-semibold leading-snug">{item.name}</h3>
          {item.price &&
          <span className="font-heading text-base font-semibold text-primary whitespace-nowrap">{item.price}</span>
          }
        </div>
        {item.description &&
        <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.description}</p>
        }
      </div>
    </motion.div>);

}

export default function MenuPage() {
  const [active, setActive] = useState("bites");
  const [dbItems, setDbItems] = useState([]);

  useEffect(() => {
    base44.entities.MenuItem.list().then(setDbItems).catch(() => {});
  }, []);

  const staticItems = STATIC_ITEMS[active] || [];
  const categoryDbItems = dbItems.filter((d) => d.category === active);

  // Merge: for each static item, find matching db item by name (for image)
  const merged = staticItems.map((item) => ({
    item,
    dbItem: categoryDbItems.find((d) => d.name.toLowerCase() === item.name.toLowerCase())
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-background py-16 px-5 md:px-8 bg-[hsl(var(--primary))]">
        <div className="max-w-7xl mx-auto">
          <Link to="/home" className="inline-flex items-center gap-2 text-background/60 hover:text-background font-body text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-background mb-3">
            BA-LI Menu
          </h1>
          <p className="font-body text-background/60 text-sm">
            Dairy Restaurant · Chalav Yisrael · Hollywood, Florida
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border px-5 md:px-8 py-4">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map((cat) =>
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-full font-body text-sm whitespace-nowrap transition-all duration-200 ${
              active === cat.id ?
              "bg-primary text-primary-foreground shadow" :
              "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`
              }>
              
                {cat.label}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Items grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}>
            
            <h2 className="font-heading text-2xl font-semibold mb-8">
              {CATEGORIES.find((c) => c.id === active)?.label}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {merged.map(({ item, dbItem }, i) =>
              <MenuItemCard key={item.name + i} item={item} dbItem={dbItem} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>);

}