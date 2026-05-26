import React from "react";
import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}