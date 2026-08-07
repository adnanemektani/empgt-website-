import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Conditions générales du Programme Partenaires | E-MPGT",
  description:
    "Conditions générales du Programme d'Apporteurs d'Affaires E-MPGT.",
};

const SECTIONS = [
  {
    title: "1. Objet du programme",
    body: "Le Programme Partenaires permet à des apporteurs d'affaires indépendants de recommander des clients potentiels à la Société dans les domaines suivants : conseil BTP et ingénierie, mise à disposition d'experts, sourcing matériel, logistique internationale. Le Partenaire perçoit une commission dans les conditions définies ci-après.",
  },
  {
    title: "2. Statut professionnel obligatoire",
    body: "Le Partenaire doit être une société, entreprise individuelle ou entrepreneur légalement immatriculé, disposer d'un numéro d'identification fiscale valide, et être en conformité avec les obligations fiscales et sociales de son pays. Les particuliers non immatriculés ne sont pas éligibles. Le Partenaire agit en qualité de professionnel indépendant. Le programme ne constitue en aucun cas un contrat de travail ni une relation de subordination. Le Partenaire ne dispose d'aucun pouvoir de représentation ni d'engagement au nom de la Société.",
  },
  {
    title: "3. Déclaration et validation des opportunités",
    body: "Une opportunité commerciale est considérée comme valide si elle est déclarée via la plateforme officielle du programme, n'était pas déjà en cours de négociation avec la Société, et est validée par écrit par la Société. La Société se réserve le droit d'accepter ou refuser toute opportunité.",
  },
  {
    title: "4. Conditions d'attribution des commissions",
    body: "La commission est due uniquement sur les montants hors taxes, effectivement facturés, et intégralement encaissés par la Société. Aucune commission n'est due sur simple prise de contact, sur devis non signé, sur facture non encaissée, ou sur contrats annulés ou impayés. La commission est définitivement acquise uniquement après encaissement effectif.",
  },
  {
    title: "5. Durée des commissions",
    body: "Sauf accord spécifique écrit, la commission s'applique à la mission initiale issue de l'apport validé. Les renouvellements, extensions ou nouveaux contrats peuvent faire l'objet d'un accord distinct. Aucun droit automatique à commission perpétuelle n'est accordé.",
  },
  {
    title: "6. Modalités de paiement",
    body: "Les commissions validées sont payées mensuellement, après validation interne, sous réserve de réception d'une facture conforme émise par le Partenaire. Le paiement est effectué par Payoneer ou virement bancaire international. La Société ne procédera à aucun paiement sans réception d'une facture valide. Le Partenaire demeure seul responsable de ses obligations fiscales et déclaratives.",
  },
  {
    title: "7. Facturation obligatoire",
    body: "Le Partenaire doit émettre une facture conforme à la réglementation applicable dans son pays. La facture devra comporter l'identité complète du Partenaire, son numéro fiscal, la référence des commissions, le montant hors taxes et les taxes applicables. La Société se réserve le droit de demander tout justificatif d'immatriculation.",
  },
  {
    title: "8. Obligations du Partenaire",
    body: "Le Partenaire s'engage à agir de bonne foi, respecter l'image et la réputation de la Société, ne faire aucune promesse contractuelle, et ne pas engager la Société sans autorisation écrite.",
  },
  {
    title: "9. Non-contournement",
    body: "Le Partenaire s'interdit de contracter directement avec un client apporté, détourner une opportunité commerciale, ou interférer dans l'exécution des missions. Cette interdiction s'applique pendant la durée de la relation et pendant 24 mois après la fin de celle-ci.",
  },
  {
    title: "10. Absence de garantie",
    body: "La Société ne garantit aucun volume minimal d'activité, aucun montant minimal de commission, ni aucune exclusivité territoriale. Le programme constitue une opportunité commerciale sans obligation de résultat.",
  },
  {
    title: "11. Résiliation",
    body: "La Société peut suspendre ou résilier l'accès au programme à tout moment en cas de manquement aux présentes conditions, de comportement préjudiciable ou de fraude. Les commissions acquises sur montants encaissés restent dues.",
  },
  {
    title: "12. Modification du programme",
    body: "La Société peut modifier le taux de commission, les règles du programme et les modalités de paiement. Les modifications prennent effet après publication.",
  },
  {
    title: "13. Droit applicable",
    body: "Le présent programme est régi par le droit portugais. Tout litige sera soumis aux juridictions compétentes du Portugal.",
  },
];

export default function CguPartenairesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface pb-24 pt-36 lg:pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Programme Partenaires
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Conditions générales du Programme Partenaires
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Programme d&apos;Apporteurs d&apos;Affaires — Dernière mise à jour : 31/01/2026
          </p>

          <div className="mt-10 space-y-6 rounded-3xl border border-border bg-background p-7 shadow-sm lg:p-9">
            <p className="text-sm leading-relaxed text-foreground/85">
              Les présentes conditions régissent la participation au Programme
              Partenaires proposé par E-MPGT NIF : 518098427 Portugal (ci-après
              « la Société »). Toute inscription au programme implique
              l&apos;acceptation pleine et entière des présentes conditions.
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
