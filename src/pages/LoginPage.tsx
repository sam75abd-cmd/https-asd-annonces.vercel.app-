import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    const from =
      (location.state as { from?: string } | null)?.from ?? "/mes-annonces";
    navigate(from, { replace: true });
  }

  return (
    <div className="container-app flex min-h-[70vh] items-center justify-center py-10">
      <div className="card w-full max-w-sm p-6">
        <h1 className="mb-1 text-lg font-bold text-gray-900">Connexion</h1>
        <p className="mb-5 text-sm text-gray-500">
          Accédez à votre compte ASD Annonces.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
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
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Pas encore de compte ?{" "}
          <Link to="/inscription" className="font-semibold text-brand-600">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
