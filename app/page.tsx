import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Ecosystem from "@/components/sections/Ecosystem";
import Services from "@/components/sections/Services";
import Partners from "@/components/sections/Partners";
import News from "@/components/sections/News";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Ecosystem />
        <Services />
        <Partners />
        <News />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
