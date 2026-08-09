import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import ExpertisesPreview from "@/components/sections/ExpertisesPreview";
import Ecosystem from "@/components/sections/Ecosystem";
import Partners from "@/components/sections/Partners";
import News from "@/components/sections/News";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Intro />
        <ExpertisesPreview />
        <Ecosystem />
        <Partners />
        <News />
        <CTA />
      </main>
      <Footer />
    </>
  );
}