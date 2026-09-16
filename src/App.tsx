import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { ListingsPage } from "./pages/ListingsPage";
import { ListingDetailPage } from "./pages/ListingDetailPage";
import { CreateListingPage } from "./pages/CreateListingPage";
import { MyListingsPage } from "./pages/MyListingsPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="annonces" element={<ListingsPage />} />
            <Route path="annonces/:id" element={<ListingDetailPage />} />
            <Route path="connexion" element={<LoginPage />} />
            <Route path="inscription" element={<SignupPage />} />
            <Route
              path="publier"
              element={
                <ProtectedRoute>
                  <CreateListingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="mes-annonces"
              element={
                <ProtectedRoute>
                  <MyListingsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
      <Analytics />
    </BrowserRouter>
  );
}
