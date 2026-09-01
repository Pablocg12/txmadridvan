import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-white">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              data-testid="button-mobile-menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="rounded-lg p-2 text-black transition-colors hover:bg-black/5 hover:text-primary md:hidden"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/" className="group flex items-center gap-2.5" onClick={closeMenu}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black font-display text-xl font-bold text-white transition-colors group-hover:bg-primary">
                T
              </div>
              <span className="font-display text-lg font-semibold tracking-wide sm:text-xl">
                TX MADRID<span className="text-primary"> VAN</span>
              </span>
            </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#servicios" className="transition-colors hover:text-primary">{t("nav_services")}</a>
            <a href="#flota" className="transition-colors hover:text-primary">{t("nav_fleet")}</a>

            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="flex items-center gap-2 border border-black/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors hover:text-primary"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === "es" ? "EN" : "ES"}
            </button>

            <Button asChild className="h-11 rounded-xl bg-primary px-7 text-xs uppercase tracking-[0.12em] text-white hover:bg-black">
              <a href="#formulario">{t("nav_book")}</a>
            </Button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="flex items-center gap-1 border border-black/10 px-2.5 py-2 text-[10px] font-bold transition-colors hover:text-primary"
            >
              <Globe className="w-3 h-3" />
              {language === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 flex flex-col" style={{ paddingTop: "4.5rem" }}>
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
          />
          <nav className="relative flex flex-col divide-y divide-black/10 border-t border-black/10 bg-white shadow-xl">
            <a
              href="#servicios"
              onClick={closeMenu}
              className="px-6 py-5 text-base font-medium transition-colors hover:bg-black hover:text-white"
            >
              {t("nav_services")}
            </a>
            <a
              href="#flota"
              onClick={closeMenu}
              className="px-6 py-5 text-base font-medium transition-colors hover:bg-black hover:text-white"
            >
              {t("nav_fleet")}
            </a>
            <a
              href="#formulario"
              onClick={closeMenu}
              className="bg-primary px-6 py-5 text-center text-base font-bold uppercase tracking-widest text-white transition-colors hover:bg-black"
            >
              {t("nav_book")}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
