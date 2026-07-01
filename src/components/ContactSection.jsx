import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Navigation, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { trackEvent, EVENTS } from "@/lib/analytics";

export default function ContactSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    trackEvent(EVENTS.CONTACT_FORM_SUBMIT);
    // Simulate submission
    setTimeout(() => {
      setSending(false);
      toast({
        title: "Message sent!",
        description: "We'll get back to you shortly.",
      });
      setForm({ name: "", phone: "", message: "" });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.25em] uppercase text-primary mb-4">
            Get in Touch
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
            We'd Love to <span className="italic">Hear</span> from You
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <p className="font-body text-muted-foreground leading-relaxed">
              Have a question, want to make a reservation, or just want to say 
              hello? Reach out to us — we're always happy to connect.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
              <a
                href="tel:+19541234567"
                onClick={() => trackEvent(EVENTS.PHONE_TAP)}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card hover:shadow-md transition-shadow text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span className="font-body text-sm font-medium">Call Now</span>
              </a>
              <a
                href="https://maps.google.com/?q=4433+Stirling+Rd+Hollywood+FL+33314"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent(EVENTS.DIRECTIONS_CLICK)}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card hover:shadow-md transition-shadow text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-primary" />
                </div>
                <span className="font-body text-sm font-medium">Get Directions</span>
              </a>
              <a
                href="https://wa.me/19541234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card hover:shadow-md transition-shadow text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <span className="font-body text-sm font-medium">WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="bg-card border-border h-12 font-body"
                />
              </div>
              <div>
                <Input
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-card border-border h-12 font-body"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-card border-border font-body resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-body font-medium flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {sending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}