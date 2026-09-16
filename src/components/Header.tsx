import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, PlusCircle, Search, User as UserIcon, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(query ? `/annonces?q=${encodeURIComponent(query)}` : "/annonces");
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-900/95 backdrop-blur">
      <div className="container-app flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-base font-bold text-white">
            A
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            ASD <span className="text-brand-400">Annonces</span>
          </span>
        </Link>

        <div className="ml-2 hidden h-10 w-[300px] shrink-0 items-center justify-center rounded-md border border-dashed border-gray-600 bg-gray-800 text-center text-[11px] leading-tight text-gray-300 lg:flex">
          Espace publicitaire disponible (300x50)
        </div>

        <form
          onSubmit={handleSearch}
          className="hidden flex-1 max-w-xl md:flex"
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Rechercher une annonce..."
              className="input pl-9"
            />
          </div>
        </form>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Link to="/publier" className="btn-primary">
            <PlusCircle className="h-4 w-4" />
            Publier une annonce
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/mes-annonces" className="btn-ghost">
                <UserIcon className="h-4 w-4" />
                Mes annonces
              </Link>
              <button onClick={() => signOut()} className="btn-secondary">
                Déconnexion
              </button>
            </div>
          ) : (
            <Link to="/connexion" className="btn-secondary">
              Connexion
            </Link>
          )}
        </div>

        <button
          className="ml-auto text-white md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-800 px-4 py-4 md:hidden">
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Rechercher..."
                className="input pl-9"
              />
            </div>
          </form>
          <div className="flex flex-col gap-2">
            <Link
              to="/publier"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full"
            >
              <PlusCircle className="h-4 w-4" />
              Publier une annonce
            </Link>
            {user ? (
              <>
                <Link
                  to="/mes-annonces"
                  onClick={() => setMobileOpen(false)}
                  className="btn-secondary w-full"
                >
                  Mes annonces
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileOpen(false);
                  }}
                  className="btn-ghost w-full"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/connexion"
                onClick={() => setMobileOpen(false)}
                className="btn-secondary w-full"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
