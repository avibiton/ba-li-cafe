import React from "react";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import TrustSection from "../components/TrustSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import { useSEO } from "@/lib/seo";

export default function About() {
  useSEO({
    title: "About BA-LI Cafe | Kosher Israeli Dairy Restaurant in Hollywood, FL",
    description:
      "BA-LI Cafe is a Chalav Yisrael kosher dairy restaurant in Hollywood, FL bringing Israeli flavors to South Florida. Fresh, made-from-scratch kosher dairy cuisine.",
  });
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <div className="pt-20">
        <AboutSection />
        <TrustSection />
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
}