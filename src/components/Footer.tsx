const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com/asdannonces",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@asd.distribution",
    path: (
      <path d="M14 3v10.5a3.5 3.5 0 1 1-3.5-3.5c.35 0 .69.04 1 .12V7.5a6 6 0 1 0 5 5.92V8.6a7.2 7.2 0 0 0 4 1.2V7.3A4.3 4.3 0 0 1 16.3 3H14Z" />
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/asdannonces",
    path: (
      <path d="M14.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2.2H9.4V14h2.4v7h2.7Z" />
    ),
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-gray-900">
      <div className="container-app grid gap-8 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <span className="text-lg font-extrabold tracking-tight text-white">
            ASD <span className="text-brand-400">Annonces</span>
          </span>
          <p className="mt-3 text-sm text-gray-400">
            La plateforme de petites annonces simple et gratuite au Maroc.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">
            Catégories
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Immobilier</li>
            <li>Véhicules</li>
            <li>Emploi</li>
            <li>Électronique</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">
            À propos
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Comment ça marche</li>
            <li>Sécurité & conseils</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Suivez-nous</h3>
          <p className="text-sm text-gray-400">
            Retrouvez ASD Annonces sur les réseaux sociaux.
          </p>
          <div className="mt-3 flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-colors hover:border-brand-500 hover:text-brand-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  {social.path}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6">
        <div className="container-app flex justify-center">
          <div className="flex h-[100px] w-full max-w-sm items-center justify-center rounded-lg border-2 border-dashed border-gray-700 bg-gray-800 text-center text-xs text-gray-300">
            Emplacement publicitaire disponible (300x100)
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} ASD Annonces. Tous droits réservés.
      </div>
    </footer>
  );
}
