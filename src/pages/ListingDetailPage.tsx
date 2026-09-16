import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapPin, Phone, Trash2, User as UserIcon } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import type { ListingWithCategory, Profile } from "../types/database";

function formatPrice(price: number | null, currency: string) {
  if (price === null) return "Prix à négocier";
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function ListingDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState<ListingWithCategory | null>(null);
  const [seller, setSeller] = useState<Profile | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load(listingId: string) {
      setLoading(true);
      const { data } = await supabase
        .from("listings")
        .select("*, categories(id, name, slug)")
        .eq("id", listingId)
        .single();

      if (data) {
        setListing(data as ListingWithCategory);
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.owner_id)
          .single();
        setSeller(profile ?? null);
      }
      setLoading(false);
    }
    if (id) load(id);
  }, [id]);

  async function handleDelete() {
    if (!listing) return;
    if (!confirm("Supprimer définitivement cette annonce ?")) return;
    await supabase.from("listings").delete().eq("id", listing.id);
    navigate("/mes-annonces");
  }

  if (loading) {
    return (
      <div className="container-app py-10 text-sm text-gray-500">
        Chargement de l'annonce...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container-app py-16 text-center">
        <p className="text-gray-600">Cette annonce est introuvable.</p>
        <Link to="/annonces" className="mt-4 inline-block text-brand-600">
          Retour aux annonces
        </Link>
      </div>
    );
  }

  const isOwner = user?.id === listing.owner_id;
  const images = listing.images?.length ? listing.images : [];

  return (
    <div className="container-app py-8">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="aspect-video overflow-hidden rounded-xl bg-gray-100">
            {images.length > 0 ? (
              <img
                src={images[activeImage]}
                alt={listing.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-300">
                Aucune image
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${
                    i === activeImage ? "border-brand-600" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="card mt-6 p-5">
            <h2 className="mb-2 text-sm font-semibold text-gray-900">
              Description
            </h2>
            <p className="whitespace-pre-line text-sm text-gray-600">
              {listing.description}
            </p>
          </div>
        </div>

        <div>
          <div className="card p-5">
            {listing.categories && (
              <span className="badge mb-2">{listing.categories.name}</span>
            )}
            <h1 className="text-xl font-bold text-gray-900">{listing.title}</h1>
            <p className="mt-2 text-2xl font-extrabold text-brand-700">
              {formatPrice(listing.price, listing.currency)}
            </p>
            <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              {listing.city}
            </p>

            {isOwner ? (
              <button
                onClick={handleDelete}
                className="btn-secondary mt-5 w-full text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Supprimer l'annonce
              </button>
            ) : (
              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <UserIcon className="h-4 w-4" />
                  {seller?.full_name ?? "Vendeur ASD Annonces"}
                </div>
                {seller?.phone ? (
                  <a href={`tel:${seller.phone}`} className="btn-primary w-full">
                    <Phone className="h-4 w-4" />
                    {seller.phone}
                  </a>
                ) : (
                  <p className="text-xs text-gray-400">
                    Numéro non renseigné par le vendeur.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
