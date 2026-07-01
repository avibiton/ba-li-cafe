import React from "react";
import Navbar from "../components/Navbar";
import GallerySection from "../components/GallerySection";
import Footer from "../components/Footer";
import { useSEO } from "@/lib/seo";

export default function Gallery() {
  useSEO({
    title: "Gallery | BA-LI Cafe — Hollywood, FL Kosher Dairy Restaurant",
    description:
      "Explore the BA-LI Cafe gallery — photos of our kosher dairy dishes, Israeli breakfast, sushi, fresh juices, and our beautiful restaurant in Hollywood, FL.",
  });
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