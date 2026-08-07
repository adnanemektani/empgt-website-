import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Conditions générales de service | E-MPGT",
  description: "Conditions générales de service d'E-MPGT.",
};

const SECTIONS = [
  {
    title: "1. Identité de la société",
    body: "Les services sont fournis par E-MPGT UNIPESSOAL LDA — 73 Avenida Arriaga 9004-533 Funchal — NIF : 518098427 — Portugal.",
  },
  {
    title: "2. Objet des services",
    body: "E-MPGT fournit des prestations professionnelles dans les domaines suivants : conseil en BTP et ingénierie, mise à disposition d'experts et consultants, sourcing matériel et fournisseurs, logistique internationale et coordination opérationnelle. Les prestations sont définies contractuellement au cas par cas via devis, contrat ou bon de commande.",
  },
  {
    title: "3. Accès au site",
    body: "L'accès au site est libre. Certaines sections (formulaire, espace partenaire, etc.) peuvent nécessiter la communication d'informations professionnelles. L'utilisateur s'engage à fournir des informations exactes et à jour.",
  },
  {
    title: "4. Engagements contractuels",
    body: "Toute prestation fait l'objet d'un devis accepté, d'un contrat signé ou d'un bon de commande validé. Aucune prestation n'est engagée sans validation formelle écrite.",
  },
  {
    title: "5. Responsabilité",
    body: "E-MPGT est tenue à une obligation de moyens. Sa responsabilité ne saurait être engagée en cas de retard imputable au client, de force majeure, d'informations incomplètes ou erronées fournies par le client, ou de décisions prises indépendamment par le client. En tout état de cause, la responsabilité financière d'E-MPGT est limitée au montant de la prestation concernée.",
  },
  {
    title: "6. Propriété intellectuelle",
    body: "Tous les contenus du site (textes, logos, visuels, documents) sont la propriété exclusive d'E-MPGT. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est interdite.",
  },
  {
    title: "7. Confidentialité",
    body: "E-MPGT s'engage à traiter toute information transmise dans le cadre d'une mission avec confidentialité. Des accords de confidentialité (NDA) peuvent être conclus à la demande des parties.",
  },
  {
    title: "8. Données personnelles",
    body: "Les données collectées via le site sont utilisées uniquement pour répondre aux demandes, traiter les prestations et assurer le suivi commercial. Elles ne sont pas cédées à des tiers sans consentement, sauf obligation légale.",
  },
  {
    title: "9. Modification des conditions",
    body: "E-MPGT se réserve le droit de modifier les présentes conditions à tout moment. Les nouvelles conditions entrent en vigueur dès leur publication sur le site.",
  },
  {
    title: "10. Droit applicable",
    body: "Les présentes conditions sont régies par le droit applicable à la société contractante. Tout litige sera soumis à la compétence exclusive des tribunaux du siège social de la société émettrice du contrat.",
  },
  {
    title: "11. Contact",
    body: "Pour toute question, contactez-nous via le formulaire de contact.",
  },
];

export default function CguPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface pb-24 pt-36 lg:pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Mentions légales
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Conditions générales de service
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Dernière mise à jour : 31/01/2026
          </p>

          <div className="mt-10 space-y-6 rounded-3xl border border-border bg-background p-7 shadow-sm lg:p-9">
            <p className="text-sm leading-relaxed text-foreground/85">
              Les présentes Conditions Générales de Service (ci-après les
              « Conditions ») régissent l&apos;accès et l&apos;utilisation des services
              proposés par E-MPGT. En accédant au site ou en utilisant nos
              services, vous acceptez sans réserve les présentes Conditions.
            </p>
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="text-base font-bold tracking-tight text-foreground">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
