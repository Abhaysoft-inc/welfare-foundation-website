"use client"
import Navbar from "@/components/landing/Navbar";
import IndianHeroSection from "@/components/landing/IndianHeroSection";
import About from "@/components/landing/About";
import Impact from "@/components/landing/Impact";
import Programs from "@/components/landing/Programs";
import Gallery from "@/components/landing/Gallery";
import ReachUs from "@/components/landing/ReachUs";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <IndianHeroSection />
      <About />
      {/* <Impact /> */}
      <Programs />
      <ReachUs />
      {/* <Gallery /> */}
      <Footer />
    </>
  );
}
