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
      <header className="fixed top-0 left-0 right-0 z-40 glass-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group" onClick={closeMenu}>
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-display font-bold text-xl group-hover:bg-primary transition-colors">
              T
            </div>
            <span className="font-display text-xl font-semibold tracking-wide">
              TX MADRID<span className="text-primary"> VAN</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
            <a href="#servicios" className="hover:text-primary transition-colors">{t("nav_services")}</a>
            <a href="#flota" className="hover:text-primary transition-colors">{t("nav_fleet")}</a>

            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="flex items-center gap-2 hover:text-primary transition-colors uppercase tracking-wider text-[10px] font-bold border border-black/10 px-3 py-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === "es" ? "EN" : "ES"}
            </button>

            <Button asChild className="bg-primary text-white hover:bg-black rounded-none uppercase tracking-widest text-xs px-8 h-12">
              <a href="#formulario">{t("nav_book")}</a>
            </Button>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="flex items-center gap-1 hover:text-primary transition-colors text-[10px] font-bold border border-black/10 px-2 py-1"
            >
              <Globe className="w-3 h-3" />
              {language === "es" ? "EN" : "ES"}
            </button>
            <button
              data-testid="button-mobile-menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="p-2 text-black hover:text-primary transition-colors"
              aria-label="Abrir menú"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 flex flex-col" style={{ paddingTop: "80px" }}>
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
          />
          <nav className="relative bg-white border-t border-black/10 flex flex-col divide-y divide-black/10 shadow-xl">
            <a
              href="#servicios"
              onClick={closeMenu}
              className="px-6 py-5 text-base font-medium hover:bg-black hover:text-white transition-colors"
            >
              {t("nav_services")}
            </a>
            <a
              href="#flota"
              onClick={closeMenu}
              className="px-6 py-5 text-base font-medium hover:bg-black hover:text-white transition-colors"
            >
              {t("nav_fleet")}
            </a>
            <a
              href="#formulario"
              onClick={closeMenu}
              className="px-6 py-5 text-base font-bold bg-primary text-white hover:bg-black transition-colors uppercase tracking-widest text-center"
            >
              {t("nav_book")}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
