import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import MenuSection from "../components/MenuSection";
import GallerySection from "../components/GallerySection";
import TestimonialSection from "../components/TestimonialSection";
import LocationSection from "../components/LocationSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <TestimonialSection />
      <LocationSection />
      <ContactSection />
      <Footer />
    </div>
  );
}