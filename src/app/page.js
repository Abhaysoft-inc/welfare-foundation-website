"use client"
import Navbar from "@/components/landing/Navbar";
import Carousel from "@/components/landing/Carousel";
import About from "@/components/landing/About";
import Impact from "@/components/landing/Impact";
import Programs from "@/components/landing/Programs";
import Gallery from "@/components/landing/Gallery";

export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />
      <About />
      <Impact />
      <Programs />
      <Gallery />
    </>
  );
}
