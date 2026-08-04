import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

function GoogleG({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

export default function TestimonialSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await base44.functions.invoke("getGoogleReviews", {});
        if (res.data?.reviews?.length) {
          setData(res.data);
        }
      } catch {
        // silent fail
      }
      setLoading(false);
    };
    load();
  }, []);

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
            Reviews
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
            What Our Guests <span className="italic">Say</span>
          </h2>
          {data?.rating && (
            <div className="inline-flex items-center gap-3 bg-background rounded-full px-5 py-2.5 shadow-sm">
              <GoogleG className="w-5 h-5" />
              <span className="flex items-center gap-1.5">
                <span className="font-heading font-semibold text-lg">{data.rating}</span>
                <Star className="w-4 h-4 fill-accent text-accent" />
              </span>
              <span className="font-body text-sm text-muted-foreground">
                · {data.total_reviews} Google reviews
              </span>
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : data?.reviews?.length ? (
          <div className="grid md:grid-cols-3 gap-6">
            {data.reviews.slice(0, 6).map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="bg-background rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  {r.profile_photo ? (
                    <img src={r.profile_photo} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-heading font-semibold text-secondary-foreground">
                      {r.author?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-heading font-semibold text-sm">{r.author}</p>
                    <p className="font-body text-xs text-muted-foreground">{r.relative_time}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${j < r.rating ? "fill-accent text-accent" : "text-muted/40"}`}
                    />
                  ))}
                </div>
                <p className="font-body text-foreground/80 leading-relaxed text-sm italic line-clamp-6">
                  "{r.text}"
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center font-body text-sm text-muted-foreground">
            Reviews are loading. Please check back shortly.
          </p>
        )}
      </div>
    </section>
  );
}