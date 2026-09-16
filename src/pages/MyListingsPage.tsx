import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import type { ListingWithCategory } from "../types/database";
import { ListingCard } from "../components/ListingCard";

export function MyListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<ListingWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      setLoading(true);
      const { data } = await supabase
        .from("listings")
        .select("*, categories(id, name, slug)")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });
      setListings((data as ListingWithCategory[]) ?? []);
      setLoading(false);
    }
    load();
  }, [user]);

  return (
    <div className="container-app py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Mes annonces</h1>
        <Link to="/publier" className="btn-primary">
          Publier une annonce
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card h-56 animate-pulse bg-gray-100" />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="card p-10 text-center text-sm text-gray-500">
          Vous n'avez pas encore publié d'annonce.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
