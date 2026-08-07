import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
      aria-label="EMPGT — Accueil"
    >
      <Image
        src="/logos/empgt-logo.png"
        alt="EMPGT"
        width={140}
        height={44}
        priority
        className="h-9 w-auto object-contain"
      />
    </Link>
  );
}