import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const images = [
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/c022ee9d7_BALIbyadirnaphotography-67.JPG", alt: "Dessert spread at BA-LI Cafe" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/a19ce22bb_BALIbyadirnaphotography-65.JPG", alt: "Dessert plates display" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/7a2d8ab47_BALIbyadirnaphotography-66.JPG", alt: "Dessert tower" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/d2a42cb6c_BALIbyadirnaphotography-64.JPG", alt: "Kosher pizza from brick oven" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/ddb89a9a7_BALIbyadirnaphotography-61.JPG", alt: "Seared salmon with asparagus" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/47abb9cc9_BALIbyadirnaphotography-62.JPG", alt: "Salmon dish plated" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/5a2398ff3_BALIbyadirnaphotography-63.JPG", alt: "Shakshuka pizza" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/d6842ad54_BALIbyadirnaphotography-60.JPG", alt: "Chef grating cheese" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/3f36afd63_BALIbyadirnaphotography-58.JPG", alt: "Chef preparing salmon" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/03c242cd9_BALIbyadirnaphotography-57.JPG", alt: "Salmon with cheese shavings" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/c347c9e06_BALIbyadirnaphotography-56.JPG", alt: "Crispy fish burger with fries" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/9d7e82759_BALIbyadirnaphotography-55.JPG", alt: "Wine and arancini" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/156899251_BALIbyadirnaphotography-52.JPG", alt: "Couscous salad with feta" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/56e534369_BALIbyadirnaphotography-53.JPG", alt: "Fish burgers duo" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/1c4a4fa80_BALIbyadirnaphotography-54.JPG", alt: "Arancini on yellow sauce" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/52093e38b_BALIbyadirnaphotography-50.JPG", alt: "Wine and arancini cheers" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/fb139b858_BALIbyadirnaphotography-51.JPG", alt: "Burrata eggplant dish" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/317cd6476_BALIbyadirnaphotography-48.JPG", alt: "Arancini close up" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/48118cff7_BALIbyadirnaphotography-49.JPG", alt: "Burrata with wine" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/530d06792_BALIbyadirnaphotography-47.JPG", alt: "Full table spread" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/c2b7a1dba_BALIbyadirnaphotography-45.JPG", alt: "Table with pizza and salads" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/dd969e901_BALIbyadirnaphotography-46.JPG", alt: "Table with wine and dishes" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/a5a2c68ad_BALIbyadirnaphotography-43.JPG", alt: "Restaurant table setting" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/e80491554_BALIbyadirnaphotography-44.JPG", alt: "Full table with all dishes" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/c08e1e116_BALIbyadirnaphotography-40.JPG", alt: "Pasta with cheese grating" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/98e929c3e_BALIbyadirnaphotography-41.JPG", alt: "Cheese grating on pasta" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/24f217d88_BALIbyadirnaphotography-42.JPG", alt: "Iced coffee BA-LI cup" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/8b9129e68_BALIbyadirnaphotography-39.JPG", alt: "Pizza with flowers" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/d4924ae5d_BALIbyadirnaphotography-38.JPG", alt: "Avocado toast" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/fa02ce273_BALIbyadirnaphotography-37.JPG", alt: "Avocado toast clean" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/cd783ccd1_BALIbyadirnaphotography-36.JPG", alt: "BA-LI restaurant interior table" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/0260b7205_BALIbyadirnaphotography-35.JPG", alt: "White pizza with flowers" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/be17a104e_BALIbyadirnaphotography-33.JPG", alt: "Restaurant table with coffee" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/ef2f38bbf_BALIbyadirnaphotography-34.JPG", alt: "Interior table with drinks" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/1f07fbbde_BALIbyadirnaphotography-31.JPG", alt: "Breakfast spread on table" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/0ebfabe6a_BALIbyadirnaphotography-32.JPG", alt: "BA-LI full breakfast spread" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/bb980cc43_BALIbyadirnaphotography-29.JPG", alt: "Israeli breakfast with menu" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/755299bdb_BALIbyadirnaphotography-30.JPG", alt: "Breakfast flat lay" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/a10bd689f_BALIbyadirnaphotography-26.JPG", alt: "Iced coffee with menu" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/0b0a3eb11_BALIbyadirnaphotography-28.JPG", alt: "BA-LI iced coffee close up" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/55023dab7_BALIbyadirnaphotography-27.JPG", alt: "Iced latte BA-LI" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/a0482f3f7_BALIbyadirnaphotography-24.JPG", alt: "Espresso shot" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/c76b9543a_BALIbyadirnaphotography-25.JPG", alt: "BA-LI cafe exterior sign" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/189108ab6_BALIbyadirnaphotography-23.JPG", alt: "BA-LI cafe front entrance" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/61a161cb6_BALIbyadirnaphotography-20.JPG", alt: "BA-LI wall mural interior" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/e0fcfc530_BALIbyadirnaphotography-21.JPG", alt: "Espresso machine BA-LI" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/dea70e7a1_BALIbyadirnaphotography-22.JPG", alt: "Espresso machine close up" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/9e63ab961_BALIbyadirnaphotography-19.JPG", alt: "Menu card and breakfast" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/0bb2bb8d9_BALIbyadirnaphotography-15.JPG", alt: "Shakshuka-style pizza" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/459920e82_BALIbyadirnaphotography-18.JPG", alt: "BA-LI breakfast spread top down" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/b7c927b7f_BALIbyadirnaphotography-16.JPG", alt: "BA-LI paper cup on espresso machine" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/74a8ba6c0_BALIbyadirnaphotography-17.JPG", alt: "BA-LI paper cup espresso" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/3ab1f29db_BALIbyadirnaphotography-14.JPG", alt: "Exploding caramel iced coffee" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/da884c511_BALIbyadirnaphotography-12.JPG", alt: "Caramel iced coffee drip" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/c7ca84c87_BALIbyadirnaphotography-10.JPG", alt: "Exploding iced coffee cup" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/f9d1b2a53_BALIbyadirnaphotography-11.JPG", alt: "Iced coffee with caramel explosion" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/568a70a73_BALIbyadirnaphotography-13.JPG", alt: "BA-LI iced coffee portrait" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/f15aa7a23_BALIbyadirnaphotography-9.JPG", alt: "Arugula avocado toast being made" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/ff8fc5cd5_BALIbyadirnaphotography-7.JPG", alt: "Avocado toast on table" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/1fbe4564b_BALIbyadirnaphotography-8.JPG", alt: "Avocado toast with arugula" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/1df339995_BALIbyadirnaphotography-6.JPG", alt: "Restaurant interior with flowers" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/3c2cf7dc7_BALIbyadirnaphotography-5.JPG", alt: "White pizza on board" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/ecdd8f5bf_BALIbyadirnaphotography-1.JPG", alt: "BA-LI cafe storefront" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/c79ab2036_BALIbyadirnaphotography-2.JPG", alt: "BA-LI cafe entrance" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/151563439_BALIbyadirnaphotography-3.JPG", alt: "BA-LI wall art" },
  { src: "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/59e605cdb_BALIbyadirnaphotography-4.JPG", alt: "Espresso being pulled" },
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