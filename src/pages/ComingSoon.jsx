import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/4fa3237c0_WhatsAppImage2026-04-27at122434.jpg";
const BG_URL = "https://media.base44.com/images/public/69ef94d7191be235637bbdb4/25be153bd_WhatsAppImage2026-04-27at1224361.jpg";

// Target opening date
const OPEN_DATE = new Date("2026-06-01T10:00:00");

function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function Digit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32">
        <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tabular-nums">
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="font-body text-xs sm:text-sm tracking-[0.2em] uppercase text-white/60">
        {label}
      </span>
    </div>
  );
}

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(OPEN_DATE);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 py-12">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={BG_URL} alt="Bali Cafe" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/55" />
      </div>

      {/* Floating bokeh blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20 blur-3xl"
            style={{
              width: `${180 + i * 40}px`,
              height: `${180 + i * 40}px`,
              left: `${[10, 70, 30, 80, 15, 60][i]}%`,
              top: `${[20, 10, 60, 70, 85, 40][i]}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <img
            src={LOGO_URL}
            alt="Bali Cafe"
            className="w-24 h-24 rounded-full object-cover shadow-2xl border-2 border-white/30 mx-auto"
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body text-xs tracking-[0.35em] uppercase text-white/60 mb-4"
        >
          Hollywood · Florida
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-4"
        >
          Bali Cafe
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="font-heading text-xl sm:text-2xl italic text-white/75 mb-12"
        >
          Something beautiful is brewing…
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="w-24 h-px bg-white/30 mb-12"
        />

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex gap-4 sm:gap-6 mb-14"
        >
          <Digit value={days} label="Days" />
          <Digit value={hours} label="Hours" />
          <Digit value={minutes} label="Minutes" />
          <Digit value={seconds} label="Seconds" />
        </motion.div>

        {/* Email capture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-md mb-10"
        >
          {submitted ? (
            <div className="bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20">
              <p className="font-body text-white font-medium">
                ✓ You're on the list — see you soon!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email for updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-3.5 text-white placeholder-white/40 font-body text-sm focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3.5 rounded-full font-body font-medium text-sm transition-colors whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          )}
        </motion.div>

        {/* Location pill */}
        <motion.a
          href="https://maps.google.com/?q=Bali+Cafe+Hollywood+Florida"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-white/70 font-body text-sm hover:text-white hover:border-white/40 transition-all mb-10"
        >
          <MapPin className="w-4 h-4 text-primary" />
          Hollywood, Florida
        </motion.a>

        {/* Social + Phone */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
          className="flex items-center gap-4"
        >
          <a
            href="https://instagram.com/balicafe"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Instagram className="w-4 h-4 text-white" />
          </a>
          <a
            href="https://facebook.com/balicafe"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Facebook className="w-4 h-4 text-white" />
          </a>
          <a
            href="tel:+19541234567"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white/70 font-body text-sm hover:text-white hover:bg-white/20 transition-all"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>
        </motion.div>
      </div>

      {/* Bottom label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 mt-12 font-body text-xs text-white/30 tracking-widest uppercase"
      >
        Dairy Restaurant · Chalav Yisrael · Coffee & More
      </motion.p>
    </div>
  );
}