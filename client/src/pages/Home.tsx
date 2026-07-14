import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BookingForm } from "@/components/BookingForm";
import { Shield, Clock, Plane, CreditCard } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* landing page hero dark luxury car city night */}
          <img 
            src="/images/mercedes-v-real.jpg" 
            alt="Premium Taxi in Madrid" 
            className="w-full h-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="uppercase tracking-[0.3em] text-sm md:text-base font-semibold mb-6 block text-white/80">
              {t("hero_badge")}
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 text-balance">
              {t("hero_title")}
            </h1>
            <p className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto text-white/90">
              {t("hero_desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#formulario" 
                className="bg-primary hover:bg-white hover:text-black text-white px-10 py-4 uppercase tracking-widest text-sm font-semibold transition-all duration-300 w-full sm:w-auto text-center"
              >
                {t("hero_btn_book")}
              </a>
              <a 
                href="#flota" 
                className="bg-transparent border border-white hover:bg-white/10 text-white px-10 py-4 uppercase tracking-widest text-sm font-semibold transition-all duration-300 w-full sm:w-auto text-center"
              >
                {t("hero_btn_fleet")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servicios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">{t("services_title")}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t("services_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Plane,
                title: t("service_1_title"),
                desc: t("service_1_desc")
              },
              {
                icon: Clock,
                title: t("service_2_title"),
                desc: t("service_2_desc")
              },
              {
                icon: Shield,
                title: t("service_3_title"),
                desc: t("service_3_desc")
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto bg-black text-white group-hover:bg-primary transition-colors flex items-center justify-center mb-6 rounded-none">
                  <service.icon className="w-10 h-10" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET SECTION */}
      <section id="flota" className="py-24 bg-neutral-50 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">{t("fleet_title")}</h2>
            <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t("fleet_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Fleet Item 1 */}
            <motion.div 
              className="bg-white group cursor-pointer shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="h-72 overflow-hidden relative">
                {/* luxury mercedes v class van */}
                <img 
                  src="/images/mercedes-v-real.jpg" 
                  alt="Mercedes Clase V" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1 font-semibold uppercase tracking-wider">
                  {t("fleet_v_tag")}
                </div>
              </div>
              <div className="p-8 border-t-4 border-transparent group-hover:border-primary transition-colors">
                <h3 className="font-display text-2xl font-bold mb-2">{t("fleet_v_title")}</h3>
                <p className="text-muted-foreground mb-4">{t("fleet_v_desc")}</p>
                <div className="flex gap-4 text-sm font-semibold text-black uppercase tracking-wider">
                  <span>{t("fleet_v_pax")}</span>
                  <span className="text-muted-foreground">•</span>
                  <span>Premium Van</span>
                </div>
              </div>
            </motion.div>

            {/* Fleet Item 2 */}
            <motion.div 
              className="bg-white group cursor-pointer shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-72 overflow-hidden relative">
                {/* luxury sedan for executives */}
                <img 
                  src="/images/tesla-s.jpg" 
                  alt="Berlinas de Lujo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 font-semibold uppercase tracking-wider">
                  {t("fleet_s_tag")}
                </div>
              </div>
              <div className="p-8 border-t-4 border-transparent group-hover:border-primary transition-colors">
                <h3 className="font-display text-2xl font-bold mb-2">{t("fleet_s_title")}</h3>
                <p className="text-muted-foreground mb-4">{t("fleet_s_desc")}</p>
                <div className="flex gap-4 text-sm font-semibold text-black uppercase tracking-wider">
                  <span>{t("fleet_s_pax")}</span>
                  <span className="text-muted-foreground">•</span>
                  <span>Business Class</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="reservas" className="py-24 bg-black text-white relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="uppercase tracking-[0.3em] text-primary text-sm font-semibold mb-4 block">
                {t("booking_badge")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                {t("booking_title")}
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                {t("booking_desc")}
              </p>
              
              <ul className="space-y-4 mb-12">
                {[
                  t("booking_feature_1"),
                  t("booking_feature_2"),
                  t("booking_feature_3"),
                  t("booking_feature_4")
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/20 pt-8 mt-8">
                <p className="text-sm uppercase tracking-wider text-white/50 mb-4">{t("booking_payments")}</p>
                <div className="flex gap-4">
                  {/* Payment Icons Placeholders */}
                  <div className="bg-white p-2 rounded h-10 w-16 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">Stripe</span>
                  </div>
                  <div className="bg-white p-2 rounded h-10 w-16 flex items-center justify-center">
                    <span className="text-blue-800 font-bold text-xs italic">PayPal</span>
                  </div>
                  <div className="bg-white p-2 rounded h-10 w-16 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>
            </div>
            
            <div id="formulario" className="text-black scroll-mt-24">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-display font-bold text-xl">
              T
            </div>
            <span className="font-display text-xl font-semibold tracking-wide">
              TX MADRID<span className="text-primary"> VAN</span>
            </span>
          </div>
          
          <div className="text-muted-foreground text-sm text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} TX MADRID VAN. {t("footer_rights")}</p>
            <p className="mt-1">{t("footer_official")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
