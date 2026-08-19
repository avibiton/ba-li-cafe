import React from "react";
import { motion } from "framer-motion";
import { Shield, Award, Star, Utensils, Coffee } from "lucide-react";

const PHONE = "+17544443770";
const DIRECTIONS_URL = "https://maps.google.com/?q=4433+Stirling+Rd+Hollywood+FL+33314";

const trustItems = [
  { icon: Shield, title: "Certified Kosher", desc: "Strictly kosher dairy under rabbinical supervision" },
  { icon: Award, title: "Chalav Yisrael", desc: "All dairy products are Chalav Yisrael certified" },
  { icon: Utensils, title: "Made from Scratch", desc: "Every dish prepared fresh daily in our kitchen" },
  { icon: Coffee, title: "Artisanal Coffee", desc: "House-roasted beans and specialty drinks" },
];

export default function TrustSection() {
  return (
    <section className="py-16 md:py-20 px-5 md:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <p className="font-body text-sm tracking-[0.25em] uppercase text-primary mb-3">
            Trust & Quality
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
            Kosher You Can <span className="italic text-primary">Trust</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            BA-LI Cafe is a Chalav Yisrael kosher dairy restaurant in Hollywood, Florida.
            Every ingredient meets the highest standards of kosher certification.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-5 md:p-6 text-center"
            >
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-sm font-semibold mb-1">{item.title}</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Review summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-card rounded-2xl py-6 px-8"
        >
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} className="w-5 h-5 fill-accent text-accent" />
            ))}
          </div>
          <p className="font-body text-sm text-muted-foreground text-center sm:text-left">
            Loved by the South Florida kosher community — join us for breakfast, lunch, or dinner.
          </p>
          <div className="flex gap-3">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Call Us
            </a>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary/40 text-primary px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/5 transition-colors"
            >
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}