import { useMutation } from "@tanstack/react-query";
import { api, type BookingInput, type BookingResponse } from "@shared/routes";
import { z } from "zod";

export function useCreateBooking() {
  return useMutation({
    mutationFn: async (data: BookingInput) => {
      // Validate input before sending using the shared schema
      const validated = api.bookings.create.input.parse(data);
      
      const res = await fetch(api.bookings.create.path, {
        method: api.bookings.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const errorData = await res.json();
          // Attempt to parse standard error schema, fallback to generic message
          throw new Error(errorData.message || "Error de validación");
        }
        throw new Error("No se pudo procesar la reserva. Por favor, intente de nuevo.");
      }

      const responseData = await res.json();
      return api.bookings.create.responses[201].parse(responseData);
    },
  });
}
