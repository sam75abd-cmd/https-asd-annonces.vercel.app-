import { Link } from "react-router-dom";
import type { Category } from "../types/database";

const EMOJIS: Record<string, string> = {
  home: "🏠",
  car: "🚗",
  briefcase: "💼",
  smartphone: "📱",
  sofa: "🏡",
  shirt: "👕",
  "gamepad-2": "⚽",
  wrench: "🔧",
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
      {categories.map((category) => {
        const emoji = (category.icon && EMOJIS[category.icon]) || "🏷️";
        return (
          <Link
            key={category.id}
            to={`/annonces?categorie=${category.slug}`}
            className="card flex flex-col items-center gap-2 px-3 py-5 text-center transition-colors hover:border-brand-300 hover:bg-brand-50"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-2xl">
              {emoji}
            </span>
            <span className="text-xs font-medium text-gray-700">
              {category.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
