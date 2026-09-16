import { Link } from "react-router-dom";
import { MapPin, ImageOff } from "lucide-react";
import type { ListingWithCategory } from "../types/database";

function formatPrice(price: number | null, currency: string) {
  if (price === null) return "Prix à négocier";
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function ListingCard({ listing }: { listing: ListingWithCategory }) {
  const image = listing.images?.[0];

  return (
    <Link
      to={`/annonces/${listing.id}`}
      className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <ImageOff className="h-10 w-10" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        {listing.categories && (
          <span className="badge w-fit">{listing.categories.name}</span>
        )}
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {listing.title}
        </h3>
        <p className="mt-auto text-base font-bold text-brand-700">
          {formatPrice(listing.price, listing.currency)}
        </p>
        <p className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="h-3.5 w-3.5" />
          {listing.city}
        </p>
      </div>
    </Link>
  );
}
