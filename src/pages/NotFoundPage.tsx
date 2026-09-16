import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-extrabold text-gray-900">404</h1>
      <p className="mt-2 text-gray-500">Cette page n'existe pas.</p>
      <Link to="/" className="btn-primary mt-6">
        Retour à l'accueil
      </Link>
    </div>
  );
}
