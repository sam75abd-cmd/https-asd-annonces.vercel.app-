import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="container-app flex min-h-[70vh] items-center justify-center py-10">
        <div className="card max-w-sm p-6 text-center">
          <h1 className="mb-2 text-lg font-bold text-gray-900">
            Vérifiez vos emails
          </h1>
          <p className="text-sm text-gray-600">
            Un email de confirmation vous a été envoyé. Cliquez sur le lien
            pour activer votre compte, puis connectez-vous.
          </p>
          <button
            onClick={() => navigate("/connexion")}
            className="btn-primary mt-5 w-full"
          >
            Aller à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app flex min-h-[70vh] items-center justify-center py-10">
      <div className="card w-full max-w-sm p-6">
        <h1 className="mb-1 text-lg font-bold text-gray-900">Créer un compte</h1>
        <p className="mb-5 text-sm text-gray-500">
          Rejoignez ASD Annonces pour publier vos annonces.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Nom complet
            </label>
            <input
              required
              className="input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Email
            </label>
            <input
              type="email"
              required
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Mot de passe
            </label>
            <input
              type="password"
              required
              minLength={6}
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Création..." : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Déjà inscrit ?{" "}
          <Link to="/connexion" className="font-semibold text-brand-600">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
