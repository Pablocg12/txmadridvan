import { pgTable, text, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  origen: text("origen").notNull(),
  destino: text("destino").notNull(),
  fecha: text("fecha").notNull(),
  hora: text("hora").notNull(),
  pasajeros: integer("pasajeros").notNull(),
  equipaje: integer("equipaje").notNull(),
  estado: varchar("estado", { length: 20 }).notNull().default("pendiente"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({ 
  id: true, 
  estado: true,
  createdAt: true 
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type CreateBookingRequest = InsertBooking;
export type UpdateBookingRequest = Partial<InsertBooking>;
export type BookingResponse = Booking;
