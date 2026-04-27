import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Car } from "lucide-react";

const hours = [
  { day: "Sunday – Thursday", time: "8:00 AM – 11:00 PM" },
  { day: "Friday", time: "8:00 AM – 3:00 PM" },
  { day: "Saturday", time: "Closed" },
];

export default function LocationSection() {
  return (
    <section id="location" className="py-24 md:py-32 bg-card px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.25em] uppercase text-primary mb-4">
            Find Us
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
            Visit <span className="italic">Bali Cafe</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] md:aspect-auto md:min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.6!2d-80.14!3d26.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDAwJzM2LjAiTiA4MMKwMDgnMjQuMCJX!5e0!3m2!1sen!2sus!4v1600000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bali Cafe Location"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center space-y-10"
          >
            {/* Address */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold mb-1">Address</h3>
                <p className="font-body text-muted-foreground">
                  Hollywood, Florida
                </p>
                <a
                  href="https://maps.google.com/?q=Bali+Cafe+Hollywood+Florida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-primary hover:underline mt-1 inline-block"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold mb-3">Opening Hours</h3>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between font-body text-sm gap-6">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className="font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Parking */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold mb-1">Parking</h3>
                <p className="font-body text-muted-foreground text-sm">
                  Free parking available on-site for all guests.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}