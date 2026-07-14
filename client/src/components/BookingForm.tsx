import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateBooking } from "@/hooks/use-bookings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Briefcase, Plane, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";

const TIME_SLOTS = Array.from({ length: 96 }, (_, i) => {
  const h = Math.floor(i / 4).toString().padStart(2, "0");
  const m = ["00", "15", "30", "45"][i % 4];
  return `${h}:${m}`;
});

const formSchema = z.object({
  origen: z.string().min(2, "Obligatorio"),
  destino: z.string().min(2, "Obligatorio"),
  fecha: z.string().min(1, "Obligatoria"),
  hora: z.string().min(1, "Obligatoria"),
  pasajeros: z.coerce.number().min(1, "Mínimo 1").max(8, "Máximo 8"),
  equipaje: z.coerce.number().min(0, "Mínimo 0").max(10, "Máximo 10"),
  vuelo: z.string().optional(),
  extras: z.string().optional(),
  comentarios: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const E = {
  reserva:    "\uD83D\uDCE2",
  origen:     "\uD83D\uDCCD",
  fecha:      "\uD83D\uDCC5",
  hora:       "\u23F0",
  pasajeros:  "\uD83D\uDC64",
  equipaje:   "\uD83E\uDDF3",
  avion:      "\u2708\uFE0F",
  hotel:      "\uD83C\uDFE8",
  tren:       "\uD83D\uDE86",
  restaurante:"\uD83C\uDF7D\uFE0F",
  oficina:    "\uD83C\uDFE2",
  pin:        "\uD83D\uDCCD",
  bebe:       "\uD83D\uDC76",
  nota:       "\uD83D\uDCDD",
};

const getDestIcon = (dest: string) => {
  const d = dest.toLowerCase();
  if (["t1","t2","t3","t4","aeropuerto","airport"].some(k => d.includes(k))) return E.avion;
  if (["hotel"].some(k => d.includes(k))) return E.hotel;
  if (["estacion","tren","atocha","chamartin","station","train"].some(k => d.includes(k))) return E.tren;
  if (["restaurante","cena","comida","restaurant","dinner","lunch"].some(k => d.includes(k))) return E.restaurante;
  if (["oficina","empresa","trabajo","office","company","work"].some(k => d.includes(k))) return E.oficina;
  return E.pin;
};

const buildWhatsAppUrl = (data: FormData) => {
  const whatsappNumber = "34611089440";
  const icono = getDestIcon(data.destino);
  const lines = [
    `${E.reserva} *Nueva solicitud de reserva*`,
    ``,
    `${E.origen} *Origen:* ${data.origen}`,
    `${icono} *Destino:* ${data.destino}`,
    `${E.fecha} *Fecha:* ${data.fecha}`,
    `${E.hora} *Hora:* ${data.hora}`,
    `${E.pasajeros} *Pasajeros:* ${data.pasajeros}`,
    `${E.equipaje} *Equipaje:* ${data.equipaje}`,
  ];
  if (data.vuelo) lines.push(`${E.avion} *Vuelo/Tren:* ${data.vuelo}`);
  if (data.extras && data.extras !== "ninguno") lines.push(`${E.bebe} *Accesorios:* ${data.extras}`);
  if (data.comentarios) lines.push(`${E.nota} *Comentarios:* ${data.comentarios}`);
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
};

const selectClass = "w-full h-12 px-3 rounded-none border border-border bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none";

const dateInputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  height: "3rem",
  paddingLeft: "2.5rem",
  paddingRight: "0.75rem",
  border: "1px solid hsl(var(--border))",
  borderRadius: 0,
  backgroundColor: "white",
  fontSize: "0.875rem",
  outline: "none",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  margin: 0,
  display: "block",
  fontFamily: "inherit",
  color: "inherit",
};

export function BookingForm() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const createBooking = useCreateBooking();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origen: "",
      destino: "",
      fecha: "",
      hora: "",
      pasajeros: 1,
      equipaje: 0,
      vuelo: "",
      extras: "ninguno",
      comentarios: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const whatsappUrl = buildWhatsAppUrl(data);
    window.open(whatsappUrl, "_blank");
    setIsSuccess(true);
    form.reset();
    toast({
      title: t("toast_success_title"),
      description: t("toast_success_desc"),
      duration: 5000,
    });
    setTimeout(() => setIsSuccess(false), 5000);
    createBooking.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-10 border border-border text-center h-full flex flex-col justify-center items-center">
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-semibold mb-2">{t("form_success_title")}</h3>
        <p className="text-muted-foreground">{t("form_success_desc")}</p>
        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="mt-8 rounded-none border-black text-black hover:bg-black hover:text-white"
        >
          {t("form_success_btn")}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 border border-border shadow-2xl shadow-black/5">
      <div className="mb-8">
        <h3 className="font-display text-3xl font-semibold mb-2">{t("form_title")}</h3>
        <p className="text-muted-foreground text-sm">{t("form_desc")}</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* Origen / Destino */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="origen" className="text-xs uppercase tracking-wider font-semibold">{t("form_origin")}</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                id="origen"
                placeholder={t("form_origin_placeholder")}
                className="pl-10 h-12 rounded-none border-border focus-visible:ring-primary focus-visible:border-primary"
                {...form.register("origen")}
              />
            </div>
            {form.formState.errors.origen && (
              <p className="text-primary text-xs mt-1">{form.formState.errors.origen.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="destino" className="text-xs uppercase tracking-wider font-semibold">{t("form_destination")}</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                id="destino"
                placeholder={t("form_destination_placeholder")}
                className="pl-10 h-12 rounded-none border-border focus-visible:ring-primary focus-visible:border-primary"
                {...form.register("destino")}
              />
            </div>
            {form.formState.errors.destino && (
              <p className="text-primary text-xs mt-1">{form.formState.errors.destino.message}</p>
            )}
          </div>
        </div>

        {/* Fecha / Hora */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fecha" className="text-xs uppercase tracking-wider font-semibold">{t("form_date")}</Label>
            <div className="relative w-full overflow-hidden">
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground pointer-events-none z-10"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <input
                id="fecha"
                type="date"
                style={dateInputStyle}
                {...form.register("fecha")}
              />
            </div>
            {form.formState.errors.fecha && (
              <p className="text-primary text-xs mt-1">{form.formState.errors.fecha.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="hora" className="text-xs uppercase tracking-wider font-semibold">{t("form_time")}</Label>
            <select
              id="hora"
              className={selectClass}
              {...form.register("hora")}
              defaultValue=""
            >
              <option value="" disabled>{t("form_time_placeholder") || "Selecciona hora"}</option>
              {TIME_SLOTS.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {form.formState.errors.hora && (
              <p className="text-primary text-xs mt-1">{form.formState.errors.hora.message}</p>
            )}
          </div>
        </div>

        {/* Pasajeros / Equipaje */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="pasajeros" className="text-xs uppercase tracking-wider font-semibold">{t("form_passengers")}</Label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                id="pasajeros"
                type="number"
                min="1"
                max="8"
                className="pl-10 h-12 rounded-none border-border focus-visible:ring-primary focus-visible:border-primary"
                {...form.register("pasajeros")}
              />
            </div>
            {form.formState.errors.pasajeros && (
              <p className="text-primary text-xs mt-1">{form.formState.errors.pasajeros.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="equipaje" className="text-xs uppercase tracking-wider font-semibold">{t("form_luggage")}</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                id="equipaje"
                type="number"
                min="0"
                className="pl-10 h-12 rounded-none border-border focus-visible:ring-primary focus-visible:border-primary"
                {...form.register("equipaje")}
              />
            </div>
            {form.formState.errors.equipaje && (
              <p className="text-primary text-xs mt-1">{form.formState.errors.equipaje.message}</p>
            )}
          </div>
        </div>

        {/* Vuelo / Tren */}
        <div className="space-y-2">
          <Label htmlFor="vuelo" className="text-xs uppercase tracking-wider font-semibold">{t("form_flight")}</Label>
          <div className="relative">
            <Plane className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input
              id="vuelo"
              placeholder={t("form_flight_placeholder")}
              className="pl-10 h-12 rounded-none border-border focus-visible:ring-primary focus-visible:border-primary"
              {...form.register("vuelo")}
            />
          </div>
        </div>

        {/* Accesorios para niños */}
        <div className="space-y-2">
          <Label htmlFor="extras" className="text-xs uppercase tracking-wider font-semibold">{t("form_extras")}</Label>
          <select
            id="extras"
            className={selectClass}
            {...form.register("extras")}
          >
            <option value="ninguno">{t("form_extras_none")}</option>
            <option value="silla_bebe">{t("form_extras_baby")}</option>
            <option value="alzador">{t("form_extras_booster")}</option>
            <option value="ambos">{t("form_extras_both")}</option>
          </select>
        </div>

        {/* Comentarios */}
        <div className="space-y-2">
          <Label htmlFor="comentarios" className="text-xs uppercase tracking-wider font-semibold">{t("form_comments")}</Label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
            <textarea
              id="comentarios"
              rows={3}
              placeholder={t("form_comments_placeholder")}
              className="w-full box-border pl-10 pt-2.5 pr-3 pb-2.5 rounded-none border border-border bg-white text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-[inherit]"
              style={{ margin: 0, display: "block" }}
              {...form.register("comentarios")}
            />
          </div>
        </div>

        <Button
          type="submit"
          data-testid="button-submit-booking"
          className="w-full h-14 text-base tracking-widest uppercase rounded-none bg-black text-white hover:bg-primary transition-all duration-300"
          disabled={form.formState.isSubmitting}
        >
          {t("form_submit")}
        </Button>

      </form>
    </div>
  );
}
