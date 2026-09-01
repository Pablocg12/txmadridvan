import { motion } from "framer-motion";
import { ArrowUpRight, Check, Clock3, CreditCard, Plane, ShieldCheck } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useLanguage } from "@/hooks/use-language";

const services = [
  { icon: Plane, title: "service_1_title", description: "service_1_desc" },
  { icon: Clock3, title: "service_2_title", description: "service_2_desc" },
  { icon: ShieldCheck, title: "service_3_title", description: "service_3_desc" },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-black">
      <Navbar />
      <WhatsAppButton />

      <main>
        <section className="relative overflow-visible bg-neutral-950 pt-[4.5rem]">
          <div
            className="absolute inset-x-0 top-[4.5rem] h-[24rem] bg-cover bg-center bg-no-repeat md:h-[37rem]"
            style={{ backgroundImage: "url(/images/portada.jpg)" }}
          />
          <div className="absolute inset-x-0 top-[4.5rem] h-[24rem] bg-gradient-to-r from-black/70 via-black/35 to-black/15 md:h-[37rem]" />

          <div className="relative mx-auto flex min-h-[24rem] max-w-7xl items-start px-5 pb-20 pt-10 sm:px-8 md:min-h-[37rem] md:pb-36 md:pt-20 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl text-white"
            >
              <div className="mb-7 flex items-center gap-2 text-xs font-medium tracking-[0.08em] text-white/75">
                <span>TX Madrid Van</span>
                <span className="text-white/50">›</span>
                <span>Madrid</span>
                <span className="text-white/50">›</span>
                <span>{t("hero_badge")}</span>
              </div>
              <h1 className="max-w-xl font-sans text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-balance sm:text-5xl md:text-7xl">
                {t("hero_title")}
              </h1>
            </motion.div>
          </div>

          <div id="formulario" className="relative z-10 mx-auto -mt-20 scroll-mt-24 px-4 pb-14 sm:px-8 md:-mt-28 lg:px-10">
            <BookingForm />
          </div>
        </section>

        <section id="servicios" className="bg-white px-5 py-20 sm:px-8 md:py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
              <div className="max-w-xl">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">{t("booking_badge")}</p>
                <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">{t("services_title")}</h2>
              </div>
              <p className="max-w-md text-base leading-7 text-muted-foreground md:text-right">{t("services_desc")}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {services.map(({ icon: Icon, title, description }, idx) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: idx * 0.1 }}
                  className="group rounded-2xl border border-black/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-black/5"
                >
                  <div className="mb-12 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white transition-colors group-hover:bg-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-black/35">0{idx + 1}</span>
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-bold">{t(title)}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{t(description)}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="reservas" className="bg-black px-5 py-20 text-white sm:px-8 md:py-28 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-24">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">{t("booking_badge")}</p>
              <h2 className="max-w-xl font-display text-4xl font-bold leading-tight md:text-6xl">{t("booking_title")}</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/65 md:text-lg">{t("booking_desc")}</p>
              <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                {[t("booking_feature_1"), t("booking_feature_2"), t("booking_feature_3"), t("booking_feature_4")].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/85">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[.06] p-7 md:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">{t("booking_payments")}</p>
              <p className="mt-4 text-2xl font-semibold">{t("booking_trust_title")}</p>
              <p className="mt-3 text-sm leading-6 text-white/55">{t("booking_trust_desc")}</p>
              <div className="mt-8 flex gap-3">
                <div className="flex h-11 w-20 items-center justify-center rounded-lg bg-white text-xs font-bold text-[#635bff]">Stripe</div>
                <div className="flex h-11 w-20 items-center justify-center rounded-lg bg-white text-xs font-bold italic text-[#003087]">PayPal</div>
                <div className="flex h-11 w-20 items-center justify-center rounded-lg bg-white text-black"><CreditCard className="h-5 w-5" /></div>
              </div>
            </div>
          </div>
        </section>

        <section id="flota" className="bg-neutral-50 px-5 py-20 sm:px-8 md:py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">TX Madrid Van</p>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">{t("fleet_title")}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{t("fleet_desc")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <FleetCard
                image="/images/mercedes-v-real.jpg"
                alt="Mercedes Clase V"
                tag={t("fleet_v_tag")}
                title={t("fleet_v_title")}
                description={t("fleet_v_desc")}
                capacity={t("fleet_v_pax")}
              />
              <FleetCard
                image="/images/tesla-s.jpg"
                alt="Berlinas de lujo"
                tag={t("fleet_s_tag")}
                title={t("fleet_s_title")}
                description={t("fleet_s_desc")}
                capacity={t("fleet_s_pax")}
                accent
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 bg-white px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black font-display text-xl font-bold text-white">T</div>
            <span className="font-display text-xl font-semibold tracking-wide">TX MADRID<span className="text-primary"> VAN</span></span>
          </div>
          <div className="text-sm leading-6 text-muted-foreground md:text-right">
            <p>&copy; {new Date().getFullYear()} TX MADRID VAN. {t("footer_rights")}</p>
            <p>{t("footer_official")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FleetCard({
  image,
  alt,
  tag,
  title,
  description,
  capacity,
  accent = false,
}: {
  image: string;
  alt: string;
  tag: string;
  title: string;
  description: string;
  capacity: string;
  accent?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/10"
    >
      <div className="relative h-72 overflow-hidden md:h-80">
        <img src={image} alt={alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className={`absolute left-5 top-5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white ${accent ? "bg-primary" : "bg-black"}`}>
          {tag}
        </span>
      </div>
      <div className="p-7 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-bold">{title}</h3>
          <ArrowUpRight className="mt-1 h-5 w-5 text-black/35 transition-colors group-hover:text-primary" />
        </div>
        <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">{description}</p>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-black">{capacity}</p>
      </div>
    </motion.article>
  );
}
