import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";

export function WhatsAppButton() {
  const { t } = useLanguage();
  const whatsappNumber = "34611089440";
  const message = t("whatsapp_msg");
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 group"
      style={{ backgroundColor: "#25D366" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label={t("whatsapp_label")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-8 h-8"
        fill="white"
      >
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.783 6.86L2 30l7.347-1.746A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.55 11.55 0 0 1-5.893-1.614l-.422-.25-4.36 1.036 1.072-4.245-.276-.436A11.558 11.558 0 0 1 4.4 16C4.4 9.59 9.59 4.4 16 4.4S27.6 9.59 27.6 16 22.41 27.6 16 27.6zm6.34-8.67c-.348-.174-2.06-1.015-2.38-1.13-.32-.116-.552-.174-.784.174-.232.347-.9 1.13-1.103 1.362-.203.232-.406.26-.754.086-.348-.174-1.47-.542-2.8-1.726-1.034-.922-1.732-2.06-1.935-2.408-.203-.347-.022-.535.153-.708.157-.156.348-.406.522-.61.174-.203.232-.347.348-.579.116-.232.058-.434-.029-.608-.087-.174-.784-1.89-1.074-2.588-.283-.68-.57-.587-.784-.598l-.667-.012c-.232 0-.608.087-.927.434-.319.347-1.218 1.19-1.218 2.902s1.247 3.365 1.42 3.597c.174.232 2.455 3.748 5.95 5.257.832.359 1.48.573 1.986.733.834.265 1.594.228 2.194.138.669-.1 2.06-.842 2.35-1.655.29-.812.29-1.508.203-1.655-.086-.145-.318-.232-.666-.406z" />
      </svg>
      <span className="absolute right-full mr-4 text-white text-sm font-medium px-4 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap" style={{ backgroundColor: "#25D366" }}>
        {t("whatsapp_label")}
      </span>
    </motion.a>
  );
}
