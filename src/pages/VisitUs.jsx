import React from "react";
import Navbar from "../components/Navbar";
import LocationSection from "../components/LocationSection";
import Footer from "../components/Footer";

export default function VisitUs() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <div className="pt-20">
        <LocationSection />
      </div>
      <Footer />
    </div>
  );
}