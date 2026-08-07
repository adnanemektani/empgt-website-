import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "./about-hero";
import AboutContent from "./about-content";

export const metadata = {
  title: "À propos | E-MPGT — Le Groupe",
  description:
    "Découvrez E-MPGT : 25 ans d'expertise BTP, une histoire, des valeurs, des forces et une ambition internationale.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <AboutHero />
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
