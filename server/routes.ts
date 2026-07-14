import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.bookings.list.path, async (req, res) => {
    const bookings = await storage.getBookings();
    res.json(bookings);
  });

  app.post(api.bookings.create.path, async (req, res) => {
    try {
      // Coerce inputs if needed, though they are mostly text and integers. 
      // We will parse standard body directly first
      const input = api.bookings.create.input.parse({
        ...req.body,
        pasajeros: req.body.pasajeros ? Number(req.body.pasajeros) : undefined,
        equipaje: req.body.equipaje ? Number(req.body.equipaje) : undefined,
      });
      const booking = await storage.createBooking(input);
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
