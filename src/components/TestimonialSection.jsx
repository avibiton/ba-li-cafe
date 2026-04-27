import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    text: "The most beautiful café I've been to in South Florida. The shakshuka is incredible and the vibes are unmatched!",
    rating: 5,
  },
  {
    name: "David K.",
    text: "Perfect spot for brunch with the family. The outdoor fire pit area is magical at night. We come back every week.",
    rating: 5,
  },
  {
    name: "Rachel L.",
    text: "Finally a place that feels special! The coconut cold brew is my new obsession. The interior is so aesthetic.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-24 md:py-32 bg-card px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.25em] uppercase text-primary mb-4">
            Testimonials
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
            What Our Guests <span className="italic">Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-background rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-body text-foreground/80 leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <p className="font-heading font-semibold text-sm">
                — {t.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}