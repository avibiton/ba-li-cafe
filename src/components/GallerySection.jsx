import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const images = [
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/ecdd8f5bf_BALIbyadirnaphotography-1.JPG", alt: "BALI cafe storefront" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/cd783ccd1_BALIbyadirnaphotography-36.JPG", alt: "BALI restaurant interior table" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/1df339995_BALIbyadirnaphotography-6.JPG", alt: "Restaurant interior with flowers" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/61a161cb6_BALIbyadirnaphotography-20.JPG", alt: "BALI wall mural interior" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/0ebfabe6a_BALIbyadirnaphotography-32.JPG", alt: "BALI full breakfast spread" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/bb980cc43_BALIbyadirnaphotography-29.JPG", alt: "Israeli breakfast with menu" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/530d06792_BALIbyadirnaphotography-47.JPG", alt: "Full table spread" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/c022ee9d7_BALIbyadirnaphotography-67.JPG", alt: "Dessert spread at BALI Cafe" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/7a2d8ab47_BALIbyadirnaphotography-66.JPG", alt: "Dessert tower" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/d2a42cb6c_BALIbyadirnaphotography-64.JPG", alt: "Kosher pizza from brick oven" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/0bb2bb8d9_BALIbyadirnaphotography-15.JPG", alt: "Shakshuka-style pizza" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/0260b7205_BALIbyadirnaphotography-35.JPG", alt: "White pizza with flowers" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/ddb89a9a7_BALIbyadirnaphotography-61.JPG", alt: "Seared salmon with asparagus" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/1c4a4fa80_BALIbyadirnaphotography-54.JPG", alt: "Arancini on yellow sauce" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/fb139b858_BALIbyadirnaphotography-51.JPG", alt: "Burrata eggplant dish" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/156899251_BALIbyadirnaphotography-52.JPG", alt: "Couscous salad with feta" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/c347c9e06_BALIbyadirnaphotography-56.JPG", alt: "Crispy fish burger with fries" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/1fbe4564b_BALIbyadirnaphotography-8.JPG", alt: "Avocado toast with arugula" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/f9d1b2a53_BALIbyadirnaphotography-11.JPG", alt: "Iced coffee with caramel explosion" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/24f217d88_BALIbyadirnaphotography-42.JPG", alt: "Iced coffee BALI cup" },
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: Math.min(i * 0.03, 0.5) }}
              className="aspect-square rounded-xl overflow-hidden cursor-pointer group"
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