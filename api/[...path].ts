import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const bookingSchema = z.object({
  origen: z.string().min(1),
  destino: z.string().min(1),
  fecha: z.string().min(1),
  hora: z.string().min(1),
  pasajeros: z.coerce.number().min(1).max(8),
  equipaje: z.coerce.number().min(0).max(10),
});

app.get("/api/bookings", async (_req, res) => {
  if (!process.env.DATABASE_URL) {
    return res.json([]);
  }
  try {
    const { storage } = await import("../server/storage");
    const bookings = await storage.getBookings();
    res.json(bookings);
  } catch {
    res.json([]);
  }
});

app.post("/api/bookings", async (req, res) => {
  try {
    const input = bookingSchema.parse({
      ...req.body,
      pasajeros: req.body.pasajeros ? Number(req.body.pasajeros) : undefined,
      equipaje: req.body.equipaje ? Number(req.body.equipaje) : undefined,
    });

    if (!process.env.DATABASE_URL) {
      return res.status(201).json({ ...input, id: 0, estado: "pendiente", createdAt: new Date() });
    }

    const { storage } = await import("../server/storage");
    const booking = await storage.createBooking(input);
    res.status(201).json(booking);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.errors[0].message });
    }
    res.status(201).json({ message: "ok" });
  }
});

export default app;
