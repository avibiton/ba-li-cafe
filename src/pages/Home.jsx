import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import TrustSection from "../components/TrustSection";
import MenuSection from "../components/MenuSection";
import GallerySection from "../components/GallerySection";
import TestimonialSection from "../components/TestimonialSection";
import FAQSection from "../components/FAQSection";
import LocationSection from "../components/LocationSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { useSEO } from "@/lib/seo";

export default function Home() {
  useSEO({
    title: "BA-LI Cafe — Kosher Dairy Restaurant & Coffee Shop in Hollywood, FL",
    description:
      "BA-LI Cafe is a Chalav Yisrael kosher dairy restaurant & coffee shop in Hollywood, FL. Israeli breakfast, shakshuka, fresh salads, pasta, sushi, juices & artisanal coffee.",
  });
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TrustSection />
      <MenuSection />
      <GallerySection />
      <TestimonialSection />
      <FAQSection />
      <LocationSection />
      <ContactSection />
      <Footer />
    </div>
  );
}