import React from "react";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <div className="pt-20">
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
}