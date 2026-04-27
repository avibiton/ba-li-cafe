import React from "react";
import { motion } from "framer-motion";

const ABOUT_IMG_1 = "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/a46cc5382_WhatsAppImage2026-04-27at1224361.jpg";
const ABOUT_IMG_2 = "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/c55b6f1b0_WhatsAppImage2026-04-27at122435.jpeg";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src={ABOUT_IMG_1}
                alt="Bali Cafe interior with tropical decor and warm lighting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 md:-right-8 w-40 md:w-52 aspect-square rounded-2xl overflow-hidden border-4 border-background shadow-xl">
              <img
                src={ABOUT_IMG_2}
                alt="Good vibes neon sign inside Bali Cafe"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="font-body text-sm tracking-[0.25em] uppercase text-primary mb-4">
              Our Story
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Where Island Spirit{" "}
              <span className="italic text-primary">Meets</span> Modern Flavor
            </h2>
            <div className="space-y-5 font-body text-muted-foreground leading-relaxed">
              <p>
                Bali Cafe was born from a love of Bali's vibrant culture — its 
                warmth, its flavors, and its effortless sense of community. We 
                brought that spirit to Hollywood, Florida, creating a space 
                where every visit feels like a tropical escape.
              </p>
              <p>
                Our menu celebrates fresh, dairy-based cuisine alongside 
                artisanal coffee and decadent desserts. Every dish is crafted 
                with quality ingredients and served in an atmosphere that's 
                equal parts cozy and Instagram-worthy.
              </p>
              <p>
                Whether you're stopping by for a morning latte, a leisurely 
                brunch, or an evening fireside gathering — you'll find 
                something special waiting for you here.
              </p>
            </div>

            <div className="flex gap-12 mt-10">
              <div>
                <p className="font-heading text-3xl font-bold text-primary">Fresh</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Ingredients Daily</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-primary">Cozy</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Tropical Atmosphere</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-primary">Kosher</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Dairy Certified</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}