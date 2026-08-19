import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, Loader2, ExternalLink } from "lucide-react";
import { base44 } from "@/api/base44Client";

const INSTAGRAM_URL = "https://www.instagram.com/balicafe_miami?igsh=MWpiMHJ3Yzl1aGd6MA==";

const FALLBACK_POSTS = [
  { image_url: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/0d5cf99dd_WhatsAppImage2026-04-27at1224352.jpg", permalink: INSTAGRAM_URL },
  { image_url: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/5e0a9b7bd_WhatsAppImage2026-04-27at1224341.jpg", permalink: INSTAGRAM_URL },
  { image_url: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/1f02d99c5_WhatsAppImage2026-04-27at1224351.jpg", permalink: INSTAGRAM_URL },
  { image_url: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/a46cc5382_WhatsAppImage2026-04-27at1224361.jpg", permalink: INSTAGRAM_URL },
  { image_url: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/6aec2b4dd_WhatsAppImage2026-04-27at122436.jpg", permalink: INSTAGRAM_URL },
  { image_url: "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/8e86e968f_WhatsAppImage2026-04-27at112728.jpg", permalink: INSTAGRAM_URL },
];

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("@balicafe_miami");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await base44.functions.invoke("getInstagramFeed", {});
        const media = (res.data?.media || []).map((m) => ({
          id: m.id,
          caption: m.caption || "",
          media_type: m.media_type,
          image_url: m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url,
          permalink: m.permalink,
        })).filter((m) => m.image_url);
        if (media.length) {
          setPosts(media);
          if (res.data.username) setUsername(`@${res.data.username}`);
        } else {
          setPosts(FALLBACK_POSTS);
        }
      } catch {
        setPosts(FALLBACK_POSTS);
      }
      setLoading(false);
    };
    load();
  }, []);

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
            {username}
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

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
            {posts.slice(0, 9).map((post, i) => (
              <motion.a
                key={post.id || i}
                href={post.permalink || INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06 }}
                className="relative aspect-square rounded-xl overflow-hidden group block"
              >
                <img
                  src={post.image_url}
                  alt={post.caption?.slice(0, 80) || "Instagram post"}
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
        )}
      </div>
    </section>
  );
}