import React from "react";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/balicafe_miami?igsh=MWpiMHJ3Yzl1aGd6MA==";
const HANDLE = "@balicafe_miami";

const posts = [
  { src: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/0d5cf99dd_WhatsAppImage2026-04-27at1224352.jpg", alt: "Outdoor patio with string lights" },
  { src: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/5e0a9b7bd_WhatsAppImage2026-04-27at1224341.jpg", alt: "Fire pit lounge area with coffee cart" },
  { src: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/1f02d99c5_WhatsAppImage2026-04-27at1224351.jpg", alt: "Good vibes better bites neon sign" },
  { src: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/a46cc5382_WhatsAppImage2026-04-27at1224361.jpg", alt: "Indoor dining area with Bali decor" },
  { src: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/6aec2b4dd_WhatsAppImage2026-04-27at122436.jpg", alt: "Elegant private dining room" },
  { src: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/8e86e968f_WhatsAppImage2026-04-27at112728.jpg", alt: "Busy restaurant with happy diners" },
];

export default function InstagramFeed() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-8 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] mb-5">
            <Instagram className="w-7 h-7 text-white" />
          </div>
          <p className="font-body text-sm tracking-[0.25em] uppercase text-primary mb-3">
            Follow Us
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-3">
            {HANDLE}
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Tag us in your photos &amp; follow along for daily specials, behind-the-scenes &amp; more.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d62976] to-[#962fbf] text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-4 h-4" />
            Follow on Instagram
          </a>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06 }}
              className="relative aspect-square rounded-xl overflow-hidden group block"
            >
              <img
                src={post.src}
                alt={post.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center gap-5">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-sm font-body">
                  <Heart className="w-4 h-4 fill-white" />
                </span>
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-sm font-body">
                  <MessageCircle className="w-4 h-4 fill-white" />
                </span>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-white drop-shadow" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}