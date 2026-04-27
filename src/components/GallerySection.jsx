import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const images = [
  {
    src: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/0d5cf99dd_WhatsAppImage2026-04-27at1224352.jpg",
    alt: "Outdoor patio with string lights and tropical setting",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/5e0a9b7bd_WhatsAppImage2026-04-27at1224341.jpg",
    alt: "Fire pit lounge area with coffee cart",
    span: "",
  },
  {
    src: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/1f02d99c5_WhatsAppImage2026-04-27at1224351.jpg",
    alt: "Good vibes better bites neon sign",
    span: "",
  },
  {
    src: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/a46cc5382_WhatsAppImage2026-04-27at1224361.jpg",
    alt: "Indoor dining area with Bali decor",
    span: "",
  },
  {
    src: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/6aec2b4dd_WhatsAppImage2026-04-27at122436.jpg",
    alt: "Elegant private dining room",
    span: "",
  },
  {
    src: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/8e86e968f_WhatsAppImage2026-04-27at112728.jpg",
    alt: "Busy restaurant with happy diners",
    span: "col-span-2",
  },
  {
    src: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/2239ee0a6_WhatsAppImage2026-04-27at122433.jpg",
    alt: "Bali Cafe exterior at night with illuminated sign",
    span: "col-span-2",
  },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.25em] uppercase text-primary mb-4">
            Gallery
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
            Experience the <span className="italic">Vibe</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06 }}
              className={`${img.span} rounded-xl overflow-hidden cursor-pointer group`}
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white"
              onClick={() => setLightbox(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}