import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "./contact-section";

export const metadata = {
  title: "Contact | E-MPGT",
  description:
    "Contactez E-MPGT pour vos projets BTP, votre sourcing matériel ou vos besoins en logistique internationale.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
