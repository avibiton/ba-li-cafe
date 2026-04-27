import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Sunrise, Milk, Cake } from "lucide-react";

const categories = [
  { id: "coffee", label: "Coffee & Beverages", icon: Coffee },
  { id: "breakfast", label: "Breakfast & Brunch", icon: Sunrise },
  { id: "dairy", label: "Dairy Specials", icon: Milk },
  { id: "desserts", label: "Desserts", icon: Cake },
];

const menuItems = {
  coffee: [
    { name: "Bali Signature Latte", desc: "Rich espresso with vanilla bean and oat milk foam", price: "$6.50" },
    { name: "Iced Coconut Cold Brew", desc: "24-hour cold brew with coconut cream and a touch of cinnamon", price: "$7.00" },
    { name: "Matcha Paradise", desc: "Ceremonial grade matcha with steamed milk of your choice", price: "$6.00" },
    { name: "Tropical Smoothie Bowl", desc: "Mango, passion fruit, banana blended with açaí", price: "$12.00" },
    { name: "Fresh Squeezed Juices", desc: "Orange, grapefruit, carrot-ginger, or green detox", price: "$7.50" },
    { name: "Golden Turmeric Latte", desc: "Warm spiced turmeric with honey and steamed milk", price: "$6.00" },
  ],
  breakfast: [
    { name: "Bali Shakshuka", desc: "Two eggs poached in spiced tomato sauce with feta and fresh herbs", price: "$16.00" },
    { name: "Avocado Toast Deluxe", desc: "Sourdough topped with smashed avo, poached eggs, microgreens", price: "$15.00" },
    { name: "French Toast Royale", desc: "Brioche with fresh berries, maple syrup, and whipped cream", price: "$17.00" },
    { name: "Mediterranean Omelette", desc: "Three eggs with sundried tomatoes, olives, feta, and basil", price: "$15.00" },
    { name: "Açaí Bowl", desc: "Topped with granola, banana, coconut flakes, and honey drizzle", price: "$14.00" },
    { name: "Eggs Benedict Florentine", desc: "Poached eggs on English muffin with spinach and hollandaise", price: "$16.00" },
  ],
  dairy: [
    { name: "Truffle Mac & Cheese", desc: "Creamy four-cheese blend with black truffle and breadcrumb crust", price: "$18.00" },
    { name: "Caprese Flatbread", desc: "Fresh mozzarella, heirloom tomatoes, basil pesto on crispy flatbread", price: "$16.00" },
    { name: "Cheese Ravioli", desc: "Handmade ricotta ravioli in sage brown butter sauce", price: "$19.00" },
    { name: "Grilled Halloumi Salad", desc: "Warm halloumi over mixed greens with pomegranate and tahini", price: "$17.00" },
    { name: "Mushroom Risotto", desc: "Creamy arborio rice with porcini mushrooms and parmesan", price: "$20.00" },
    { name: "Bali Pizza", desc: "Wood-fired crust with fresh mozzarella, arugula, and truffle oil", price: "$18.00" },
  ],
  desserts: [
    { name: "Lava Chocolate Cake", desc: "Warm chocolate fondant with vanilla ice cream and berry coulis", price: "$14.00" },
    { name: "Coconut Panna Cotta", desc: "Silky coconut cream topped with passion fruit and toasted coconut", price: "$12.00" },
    { name: "Lotus Biscoff Cheesecake", desc: "Creamy cheesecake with a caramelized Biscoff cookie crust", price: "$13.00" },
    { name: "Pistachio Crème Brûlée", desc: "Classic French custard infused with pistachio and torched sugar", price: "$12.00" },
    { name: "Fresh Fruit Pavlova", desc: "Crisp meringue with cream and seasonal tropical fruits", price: "$13.00" },
    { name: "Tiramisu", desc: "Espresso-soaked ladyfingers layered with mascarpone cream", price: "$13.00" },
  ],
};

export default function MenuSection() {
  const [active, setActive] = useState("coffee");

  return (
    <section id="menu" className="py-24 md:py-32 bg-card px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.25em] uppercase text-primary mb-4">
            Our Menu
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
            Crafted with <span className="italic">Passion</span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm transition-all duration-300 ${
                  active === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {menuItems[active].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-background rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-heading text-lg font-semibold pr-3">{item.name}</h3>
                  <span className="font-heading text-lg font-semibold text-primary whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}