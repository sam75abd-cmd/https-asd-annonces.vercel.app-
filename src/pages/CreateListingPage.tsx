import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, X } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import type { Category } from "../types/database";

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

export function CreateListingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState(CITIES[0]);
  const [categoryId, setCategoryId] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        setCategories(data ?? []);
        if (data?.[0]) setCategoryId(data[0].id);
      });
  }, []);

  function handleFiles(list: FileList | null) {
    if (!list) return;
    const newFiles = Array.from(list).slice(0, 6 - files.length);
    setFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [
      ...prev,
      ...newFiles.map((f) => URL.createObjectURL(f)),
    ]);
  }

  function removeImage(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setError(null);

    try {
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const path = `${user.id}/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("listing-images")
          .upload(path, file);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage
          .from("listing-images")
          .getPublicUrl(path);
        uploadedUrls.push(data.publicUrl);
      }

      const { data: inserted, error: insertError } = await supabase
        .from("listings")
        .insert({
          owner_id: user.id,
          category_id: categoryId,
          title,
          description,
          price: price ? Number(price) : null,
          city,
          images: uploadedUrls,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      navigate(`/annonces/${inserted.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de la publication."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-app max-w-2xl py-8">
      <h1 className="mb-1 text-xl font-bold text-gray-900">
        Publier une annonce
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Remplissez les informations ci-dessous. Votre annonce sera visible
        immédiatement.
      </p>

      <form onSubmit={handleSubmit} className="card space-y-4 p-6">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Titre de l'annonce
          </label>
          <input
            required
            className="input"
            placeholder="Ex: iPhone 13 Pro, très bon état"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Catégorie
            </label>
            <select
              required
              className="input"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Ville
            </label>
            <select
              className="input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Prix (MAD) — laissez vide pour "à négocier"
          </label>
          <input
            type="number"
            min="0"
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Description
          </label>
          <textarea
            required
            rows={5}
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Photos (jusqu'à 6)
          </label>
          <div className="flex flex-wrap gap-3">
            {previews.map((src, i) => (
              <div key={src} className="relative h-20 w-20">
                <img
                  src={src}
                  alt=""
                  className="h-full w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {files.length < 6 && (
              <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 text-gray-400 hover:border-brand-400 hover:text-brand-500">
                <UploadCloud className="h-5 w-5" />
                <span className="text-[10px]">Ajouter</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
            )}
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? "Publication..." : "Publier l'annonce"}
        </button>
      </form>
    </div>
  );
}
