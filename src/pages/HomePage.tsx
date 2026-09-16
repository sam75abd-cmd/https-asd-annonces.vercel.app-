import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Category, ListingWithCategory } from "../types/database";
import { CategoryGrid } from "../components/CategoryGrid";
import { ListingCard } from "../components/ListingCard";

export function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [listings, setListings] = useState<ListingWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [{ data: cats }, { data: recent }] = await Promise.all([
        supabase.from("categories").select("*").order("sort_order"),
        supabase
          .from("listings")
          .select("*, categories(id, name, slug)")
          .eq("status", "active")
          .order("created_at", { ascending: false })
          .limit(8),
      ]);
      setCategories(cats ?? []);
      setListings((recent as ListingWithCategory[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(query ? `/annonces?q=${encodeURIComponent(query)}` : "/annonces");
  }

  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-gray-200 py-14">
        <div className="container-app text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Achetez et vendez près de chez vous
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            ASD Annonces, la marketplace de petites annonces gratuite et
            simple au Maroc.
          </p>
          <form
            onSubmit={handleSearch}
            className="mx-auto mt-6 flex max-w-xl gap-2"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Que recherchez-vous ?"
                className="input pl-9"
              />
            </div>
            <button type="submit" className="btn-primary">
              Rechercher
            </button>
          </form>
        </div>
      </section>

      <section className="container-app py-10">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Toutes les catégories
        </h2>
        <CategoryGrid categories={categories} />
      </section>

      <section className="container-app py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Annonces récentes
          </h2>
          <Link
            to="/annonces"
            className="text-sm font-semibold text-brand-600 hover:underline"
          >
            Voir tout
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card h-56 animate-pulse bg-gray-100" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="card p-10 text-center text-sm text-gray-500">
            Aucune annonce pour le moment. Soyez le premier à{" "}
            <Link to="/publier" className="font-semibold text-brand-600">
              publier une annonce
            </Link>
            .
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
