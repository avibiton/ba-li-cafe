import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useSEO } from "@/lib/seo";

const faqs = [
  {
    q: "Is BALI Cafe kosher certified?",
    a: "Yes! BALI Cafe is a strictly kosher dairy restaurant. All of our dairy products are Chalav Yisrael certified, and our kitchen operates under full rabbinical supervision. We do not serve any meat products.",
  },
  {
    q: "What does Chalav Yisrael mean?",
    a: "Chalav Yisrael is the highest standard of kosher dairy certification. It means that all dairy products — milk, cheese, butter, and more — are produced under continuous, on-site rabbinical supervision from milking through packaging. Every dairy item at BALI Cafe meets this standard.",
  },
  {
    q: "Where is BALI Cafe located?",
    a: "We're located at 4433 Stirling Rd, Hollywood, FL 33314 — in the heart of South Florida's kosher community. Free parking is available on-site for all guests.",
  },
  {
    q: "What are your hours?",
    a: "We're open Sunday through Thursday from 8:00 AM to 11:00 PM, Friday from 8:00 AM to 3:00 PM, and closed on Saturday (Shabbat).",
  },
  {
    q: "Do you offer takeout and delivery?",
    a: "Yes! We offer takeout by calling us directly. Online ordering is coming soon. Call (954) 123-4567 to place an order for pickup.",
  },
  {
    q: "What type of food do you serve?",
    a: "We serve Israeli-style kosher dairy cuisine including shakshuka, fresh salads, paninis, pasta, sushi, fresh juices, smoothies, artisanal coffee, and homemade desserts. Everything is made from scratch daily.",
  },
  {
    q: "Do you have vegetarian and vegan options?",
    a: "Absolutely. As a dairy restaurant, most of our menu is vegetarian. We also offer vegan options including our Impossible Burger, plant-based smoothies, and dairy-free choices — just ask our staff.",
  },
  {
    q: "Do you take reservations?",
    a: "We operate on a first-come, first-served basis. For large parties or special events, please call us at (954) 123-4567 and we'll do our best to accommodate you.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-24 md:py-32 px-5 md:px-8 bg-card">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <p className="font-body text-sm tracking-[0.25em] uppercase text-primary mb-4">
            FAQ
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
            Frequently Asked <span className="italic">Questions</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about BALI Cafe — Hollywood's kosher dairy restaurant.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              className="bg-background rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-heading text-sm md:text-base font-semibold">{faq.q}</span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  {open === i ? (
                    <Minus className="w-4 h-4 text-primary" />
                  ) : (
                    <Plus className="w-4 h-4 text-primary" />
                  )}
                </span>
              </button>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-5"
                >
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}