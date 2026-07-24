import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/user_685dc1d82e4f2c14c54f4a0d/4fa3237c0_WhatsAppImage2026-04-27at122434.jpg";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80 py-16 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={LOGO_URL}
                alt="Bali Cafe Logo"
                className="h-10 w-10 rounded-full object-cover" />
              
              <span className="font-heading text-lg font-semibold text-background">
                Bali Cafe
              </span>
            </div>
            <p className="font-body text-sm text-background/60 leading-relaxed">A kosher Israeli restaurant in Hollywood, Florida. Chalav Yisrael dairy cuisine that tastes just like home.


            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-background mb-4 tracking-wide uppercase">
              Quick Links
            </h4>
            <div className="space-y-2">
              {[
                { label: "About", path: "/about" },
                { label: "Menu", path: "/menu" },
                { label: "Gallery", path: "/gallery" },
                { label: "Find Us", path: "/find-us" },
                { label: "Order Online", path: "/online-ordering" },
              ].map((link) =>
              <Link
                key={link.path}
                to={link.path}
                className="block font-body text-sm text-background/60 hover:text-background transition-colors">
                  {link.label}
                </Link>
              )}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-background mb-4 tracking-wide uppercase">
              Hours
            </h4>
            <div className="space-y-2 font-body text-sm text-background/60">
              <p>Sun – Thu: 8AM – 11PM</p>
              <p>Friday: 8AM – 3PM</p>
              <p>Saturday: Closed</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-background mb-4 tracking-wide uppercase">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/balicafe_miami?igsh=MWpiMHJ3Yzl1aGd6MA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1DBJNxsWD4/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@balicafe.com"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-background/40">
            © {new Date().getFullYear()} Bali Cafe. All rights reserved.
          </p>
          <p className="font-body text-xs text-background/40">
            4433 Stirling Rd, Hollywood, FL 33314 · Kosher Dairy · Chalav Yisrael
          </p>
        </div>
      </div>
    </footer>);

}