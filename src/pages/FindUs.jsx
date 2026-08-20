import React from "react";
import Navbar from "../components/Navbar";
import LocationSection from "../components/LocationSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { useSEO } from "@/lib/seo";

export default function FindUs() {
  useSEO({
    title: "Find Us | BALI Cafe — Hollywood, FL Kosher Dairy Restaurant",
    description:
      "Visit BALI Cafe at 4433 Stirling Rd, Hollywood, FL 33314. Call (954) 123-4567. Open Sun–Thu 8AM–11PM, Fri 8AM–3PM. Free parking on-site. Chalav Yisrael kosher dairy restaurant.",
  });

  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <div className="pt-20">
        <LocationSection />
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}