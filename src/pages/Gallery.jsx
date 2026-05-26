import React from "react";
import Navbar from "../components/Navbar";
import GallerySection from "../components/GallerySection";
import Footer from "../components/Footer";

export default function Gallery() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <div className="pt-20">
        <GallerySection />
      </div>
      <Footer />
    </div>
  );
}