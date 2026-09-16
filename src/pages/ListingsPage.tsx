import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Category, ListingWithCategory } from "../types/database";
import { ListingCard } from "../components/ListingCard";

const CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
  "Meknès",
  "Oujda",
];

export function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [listings, setListings] = useState<ListingWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const q = searchParams.get("q") ?? "";
  const categorySlug = searchParams.get("categorie") ?? "";
  const city = searchParams.get("ville") ?? "";

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .order("sort_order")
      .then(({ data }) => setCategories(data ?? []));
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      let request = supabase
        .from("listings")
        .select("*, categories(id, name, slug)")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (q) request = request.ilike("title", `%${q}%`);
      if (city) request = request.eq("city", city);

      if (categorySlug) {
        const cat = categories.find((c) => c.slug === categorySlug);
        if (cat) request = request.eq("category_id", cat.id);
      }

      const { data } = await request;
      setListings((data as ListingWithCategory[]) ?? []);
      setLoading(false);
    }
    load();
  }, [q, categorySlug, city, categories]);

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  return (
    <div className="container-app py-8">
      <h1 className="mb-6 text-xl font-bold text-gray-900">
        {q ? `Résultats pour "${q}"` : "Toutes les annonces"}
      </h1>

      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <aside className="card h-fit p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
            <SlidersHorizontal className="h-4 w-4" />
            Filtres
          </div>

          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-medium text-gray-500">
              Catégorie
            </label>
            <select
              className="input"
              value={categorySlug}
              onChange={(e) => updateParam("categorie", e.target.value)}
            >
              <option value="">Toutes les catégories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-500">
              Ville
            </label>
            <select
              className="input"
              value={city}
              onChange={(e) => updateParam("ville", e.target.value)}
            >
              <option value="">Toutes les villes</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <div>
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card h-56 animate-pulse bg-gray-100" />
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="card p-10 text-center text-sm text-gray-500">
              Aucune annonce ne correspond à votre recherche.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
