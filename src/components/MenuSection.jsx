import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  { id: "bites", label: "Small Bites" },
  { id: "breakfast", label: "Breakfast" },
  { id: "toast", label: "Toast & Panini" },
  { id: "salat", label: "Salads" },
  { id: "pasta", label: "Pasta" },
  { id: "dinner", label: "Dinner" },
  { id: "sushi_rolls", label: "Sushi Rolls" },
  { id: "nigiri", label: "Nigiri" },
  { id: "juice", label: "Juices" },
  { id: "smoothie", label: "Smoothies" },
  { id: "hot_drinks", label: "Hot Drinks" },
  { id: "cold_drinks", label: "Cold Drinks" },
  { id: "milkshakes", label: "Milkshakes" },
  { id: "sweet", label: "Desserts" },
];

const menuItems = {
  bites: [
    { name: "Bread Basket", price: "$9.95" },
    { name: "Shishito Bites", desc: "Blistered shishito peppers tossed in olive oil, sea salt & lemon", price: "$13.95" },
    { name: "Nachos", desc: "Served with salsa, sour cream and guacamole", price: "$18.95" },
    { name: "Mozzarella Sticks", desc: "Served with home-made tomato sauce", price: "$16.95" },
    { name: "Bruschetta Toast", desc: "Freshly toasted sourdough topped with tomatoes, garlic, fresh herbs, olive oil & balsamic glaze", price: "$14.95" },
    { name: "Crispy Cauliflower", desc: "Freshly fried golden cauliflower served with sweet chili sauce", price: "$15.95" },
    { name: "Beet Carpaccio", desc: "Thin sliced beets topped with cheese, crushed pistachio, and fresh dill", price: "$19.95" },
    { name: "Parmesan Truffle Fries", desc: "Crispy fries tossed with parmesan, truffle oil, parsley & sea salt", price: "$12.95" },
    { name: "Grilled Halloumi Bites", desc: "Grilled halloumi cheese served with mixed greens and drizzled with dill and honey", price: "$15.95" },
    { name: "Grilled Eggplant", desc: "Served with tahini sauce", price: "$15.95" },
  ],
  breakfast: [
    { name: "Boker Tov", desc: "2 eggs your way served with Israeli salad, Jerusalem bagel, tuna salad, olive spread, tzatziki, and olives", price: "$16.95" },
    { name: "BA-LI Omelette", desc: "2 egg omelet filled with spinach, onion, mushroom, dill, and feta cheese. Served with Israeli salad", price: "$15.95" },
    { name: "The Brooklyn", desc: "Smoked lox on everything bagel with cream cheese, dill & pickled red onion", price: "$17.95" },
    { name: "Yalla Avocado", desc: "Mashed avocado on toasted sourdough topped with sunny side up egg and pickled red onion", price: "$16.95" },
    { name: "BA-LI Shakshuka", desc: "2 eggs with a Moroccan tomato sauce served with Israeli salad and toasted bread. Add feta or eggplant +$3", price: "$18.95" },
    { name: "Breakfast Sandwich", desc: "Panini with omelet, mozzarella cheese, tomato, and avocado. Served with Israeli salad", price: "$16.95" },
    { name: "Paris Breakfast", desc: "Two scrambled eggs on a fresh croissant served with Israeli salad", price: "$16.95" },
    { name: "French Toast", desc: "Challah french toast with fresh berries and maple syrup", price: "$15.95" },
  ],
  toast: [
    { name: "The OG Tuna", desc: "Tuna salad, pickle, tomato and mozzarella cheese", price: "$17.95" },
    { name: "Pesto Paradise", desc: "Fresh mozzarella, pesto, and roasted pepper and portobello mushrooms", price: "$17.95" },
    { name: "FetaAvoo Panini", desc: "Feta, avocado, hard boiled egg and tomato", price: "$17.95" },
    { name: "Say Cheese!", desc: "Mozzarella, cheddar, and feta", price: "$16.95" },
    { name: "Lox Panini", desc: "Lox, mozzarella cheese, and red onion", price: "$20.95" },
    { name: "Pizza Panini", desc: "Tomato sauce, green olives, and mozzarella cheese", price: "$16.95" },
    { name: "Vegetarian Panini", desc: "Avocado, roasted pepper, mushroom, eggplant, and fresh basil pesto", price: "$17.95" },
    { name: "Baladi Panini", desc: "Eggplant, tomato sauce, and feta cheese", price: "$17.95" },
    { name: "Mushroom Lovers", desc: "Mozzarella cheese mushroom panini with cream house mushroom sauce on top", price: "$18.95" },
    { name: "BA-LI Sabich", desc: "Pita bread with fried eggplant, tahini, hard boiled egg, Israeli salad and pickle", price: "$16.95" },
  ],
  salat: [
    { name: "Israeli Salad", desc: "Classic Israeli house salad with fresh cucumber, tomato, onion and parsley", price: "$15.95" },
    { name: "House Caesar", desc: "Lettuce, parmesan, and topped with housemade croutons mixed with creamy caesar dressing", price: "$16.95" },
    { name: "Salat Tuna", desc: "Lettuce, tomato, cucumber, onion, corn, hard boiled egg and tuna. Mixed with pesto dressing", price: "$18.95" },
    { name: "Avocado Salad", desc: "Lettuce, cherry tomato, cucumbers, corn, red onion, kalamata olives, and croutons mixed with creamy pesto", price: "$18.95" },
    { name: "Big Fat Greek", desc: "Lettuce, tomato, onion, cucumber, red pepper, kalamata olives topped with feta and dill. Mixed with olive oil & lemon", price: "$18.95" },
    { name: "Quinoa Salad", desc: "Mixed greens with quinoa, mushroom, cranberries, toasted almonds, avocado, and red pepper. Mixed with olive oil & lemon juice", price: "$18.95" },
    { name: "The Boom Salad", desc: "Lettuce, cucumbers, tomato, corn, onion, olives, tuna & feta with avocado on top. Mixed with pesto dressing", price: "$19.95" },
    { name: "Beet Salad", desc: "Mixed greens, with beets, goat cheese, fresh dill, and toasted almonds. Mixed with house balsamic", price: "$18.95" },
    { name: "Fried Cheese Salad", desc: "Lettuce, fresh mushrooms, cherry tomato, corn, olives, onion with fried mozzarella balls. Mix with honey mustard house dressing", price: "$18.95" },
    { name: "Grilled Salmon Salad", desc: "Mixed greens, cherry tomato, cucumber, red onion, avocado, and fresh grilled salmon", price: "$25.95" },
    { name: "Asiati Salad", desc: "Roasted pepper, corn, carrots, broccoli, mushrooms, pecans and bean sprouts mixed with our Asian dressing served with sesame on top (served hot)", price: "$19.95" },
  ],
  pasta: [
    { name: "Penne Vodka", desc: "Penne pasta with creamy housemade tomato-vodka sauce", price: "$21.95" },
    { name: "Classic Ziti", desc: "Classic baked ziti with melted cheese and rich housemade tomato sauce", price: "$22.95" },
    { name: "Truffle Lover", desc: "Spaghetti tossed in truffle oil with mushrooms, roasted pepper and parmesan cheese", price: "$23.95" },
    { name: "Holy Pesto", desc: "Penne pasta tossed with a creamy pesto sauce, cherry tomatoes, and topped with parmesan", price: "$22.95" },
    { name: "BA-LI Ravioli", desc: "Cheese ravioli with either creamy pesto, penne vodka, or marinara", price: "$24.95" },
    { name: "Classic Alfredo", desc: "Fettucini pasta tossed in a housemade mushroom cream sauce", price: "$23.95" },
    { name: "Opa Pasta", desc: "Spaghetti with tomato sauce, kalamata olives, mushroom, and feta cheese", price: "$22.95" },
    { name: "The Veggie", desc: "Penne pasta tossed in olive oil, garlic, spinach, roasted pepper, and mushrooms", price: "$22.95" },
  ],
  dinner: [
    { name: "Tuna Fish Shawarma", desc: "Our home-made tuna shawarma served with mashed potato", price: "$25.95" },
    { name: "Baked Potato with Cream Mushroom & Cheese", desc: "Served with Israeli salad", price: "$23.95" },
    { name: "Baked Potato with Broccoli & Cheese", desc: "Served with Israeli salad", price: "$23.95" },
    { name: "Fish & Chips", price: "$23.95" },
    { name: "Fish Sandwich", desc: "Crispy fish schnitzel served with fries, Israeli salad and fresh lemon", price: "$25.95" },
    { name: "BA-Li Branzino", desc: "Filleted branzino served with a lemon sauce and grilled vegetables", price: "$29.95" },
    { name: "Grilled Salmon Platter", desc: "Grilled salmon served with a lemon sauce and grilled vegetables", price: "$28.95" },
    { name: "Moroccan Fish", desc: "Salmon cooked in a Moroccan sauce served with fresh challah bread", price: "$27.95" },
    { name: "Impossible Burger", desc: "Vegan burger served with tomatoes, onion, pickles, ketchup and mayo. Served with french fries. Add cheese +$3", price: "$22.95" },
  ],
  juice: [
    { name: "Tapuzeem", desc: "Freshly squeezed OJ", price: "$9.95" },
    { name: "Booster", desc: "Freshly squeezed beets, apples, carrots, and celery", price: "$11.95" },
    { name: "Green Girl", desc: "Celery, apple, spinach, cucumber", price: "$10.95" },
    { name: "Apple Lovers", desc: "Fresh squeezed apple juice", price: "$11.95" },
    { name: "Grapefruit", desc: "Freshly squeezed grapefruit juice", price: "$9.95" },
    { name: "Lemonade", price: "$9.95" },
    { name: "Lemonana", price: "$11.95" },
    { name: "Veggie Juice", desc: "Carrot, celery, apple, beets", price: "$11.95" },
    { name: "Gezer", desc: "Freshly squeezed carrot juice", price: "$10.95" },
    { name: "Ginger Shotz", desc: "Freshly squeezed ginger shots", price: "$5.95" },
    { name: "Shemesh", desc: "Juice made with ginger, lemon, pineapple, orange and honey", price: "$11.95" },
    { name: "Your Way", desc: "Your choice of four ingredients: orange, grapefruit, pineapple, lemon, carrot, beet, celery, spinach, cucumber, ginger, and honey", price: "$12.95" },
  ],
  smoothie: [
    { name: "Fruity Smoothie", desc: "Strawberry, pineapple, mango, banana, milk", price: "$12.95" },
    { name: "Toot Banana", desc: "Strawberry, banana, choice of whole milk or almond milk", price: "$12.95" },
    { name: "Shoko Banana", desc: "Cocoa powder, peanut butter, banana, choice of whole milk or almond milk", price: "$12.95" },
    { name: "The Miami", desc: "Orange, mango, pineapple", price: "$12.95" },
    { name: "Tropical", desc: "Mango, banana, pineapple, honey, and almond milk", price: "$12.95" },
    { name: "The Berry", desc: "Blueberries, strawberries, milk base", price: "$12.95" },
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
    { name: "Herbal Tea", desc: "Ask us for our collection", price: "$4.50" },
  ],
  cold_drinks: [
    { name: "Iced Coffee", price: "$6.95" },
    { name: "Iced Cappuccino", price: "$9.95" },
    { name: "Slush Coffee (non sweet)", price: "$11.95" },
    { name: "BA-LI Coffee", desc: "Slush coffee with ice cream and flavor", price: "$12.95" },
    { name: "Salted Caramel Macchiato", price: "$11.95" },
    { name: "Iced Chocolate", price: "$7.95" },
    { name: "Slush Chocolate with Ice Cream", price: "$12.95" },
    { name: "Soda", price: "$2.95" },
    { name: "Snapple", price: "$4.95" },
    { name: "Bottle of Water", price: "$2.95" },
    { name: "Big Bottle Water or Sparkling", price: "$7.95" },
  ],
  milkshakes: [
    { name: "Vanilla", desc: "Served with whipped cream", price: "$12.95" },
    { name: "Chocolate", desc: "Served with whipped cream", price: "$12.95" },
    { name: "Strawberry", desc: "Served with whipped cream", price: "$12.95" },
    { name: "Cookies & Cream", desc: "Served with whipped cream", price: "$12.95" },
    { name: "Moca", desc: "Served with whipped cream", price: "$12.95" },
    { name: "Chocolate & Vanilla", desc: "Served with whipped cream", price: "$12.95" },
    { name: "Vanilla & Strawberry", desc: "Served with whipped cream", price: "$12.95" },
    { name: "Moca & Vanilla", desc: "Served with whipped cream", price: "$12.95" },
  ],
  sweet: [
    { name: "Chocolate Soufflé", desc: "Served with vanilla ice cream", price: "$19.95" },
    { name: "Waffaliko", desc: "Belgian waffle with 3 scoops of your choice of ice cream and lots of whipped cream (great for sharing)", price: "$24.95" },
    { name: "Crumbs Everywhere", desc: "Homemade cheesecake with a lot of crumbs", price: "$12.95" },
    { name: "Tiramisu", price: "$12.95" },
    { name: "Chocolate Bites", desc: "Go back to your childhood with these chocolate balls", price: "" },
    { name: "Fresh and Creamy", desc: "Strawberries with homemade whipped cream", price: "$12.95" },
    { name: "Apple Pie", desc: "Served with vanilla ice cream (contains cinnamon)", price: "$12.95" },
    { name: "After Dinner-tini", desc: "3 scoops of your choice of ice cream in an oversized martini glass and lots of whipped cream", price: "$14.95" },
    { name: "Halva Lovers", desc: "Scoop of vanilla ice cream with halva, silan and pecans", price: "$15.95" },
    { name: "Affogato", desc: "Scoop of creamy vanilla ice cream with a shot of espresso", price: "$8.95" },
  ],
  sushi_rolls: [
    { name: "California Roll", desc: "Krab mix, avocado, cucumber", price: "$11" },
    { name: "Tuna Roll", desc: "Fresh tuna and cucumber", price: "$10" },
    { name: "Spicy Tuna Roll", desc: "Spicy tuna mix and cucumber", price: "$12" },
    { name: "Salmon Roll", desc: "Fresh salmon and cucumber", price: "$10" },
    { name: "Avocado Roll", desc: "Fresh avocado", price: "$8" },
    { name: "Crunchy Tempura Roll", desc: "Tempura vegetables with crispy flakes and spicy mayo", price: "$14" },
    { name: "Bali Crunch Roll", desc: "Spicy tuna, avocado, tempura crunch and house sweet soy glaze", price: "$16" },
  ],
  nigiri: [
    { name: "Tuna Nigiri (2 pcs)", price: "$8" },
    { name: "Salmon Nigiri (2 pcs)", price: "$8" },
    { name: "Avocado Nigiri (2 pcs)", price: "$7" },
  ],
  };

export default function MenuSection() {
  const [active, setActive] = useState("bites");

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
          <p className="font-body text-muted-foreground mt-3 text-sm">
            All paninis served with house salad. Add coffee or OJ to any breakfast for $4.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-full font-body text-sm transition-all duration-300 ${
                active === cat.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {menuItems[active].map((item, i) => (
              <motion.div
                key={item.name}
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
                {item.desc && (
                  <p className="font-body text-xs text-muted-foreground leading-relaxed mt-1.5">
                    {item.desc}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA to full menu page */}
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