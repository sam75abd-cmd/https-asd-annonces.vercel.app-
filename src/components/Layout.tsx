import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container-app py-3">
        <div className="mx-auto flex h-[90px] w-full max-w-3xl items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-center text-xs text-gray-400">
          Emplacement publicitaire disponible (728x90)
        </div>
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
