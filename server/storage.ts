import { db } from "./db";
import {
  bookings,
  type CreateBookingRequest,
  type UpdateBookingRequest,
  type BookingResponse
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getBookings(): Promise<BookingResponse[]>;
  getBooking(id: number): Promise<BookingResponse | undefined>;
  createBooking(booking: CreateBookingRequest): Promise<BookingResponse>;
  updateBooking(id: number, updates: UpdateBookingRequest): Promise<BookingResponse>;
  deleteBooking(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getBookings(): Promise<BookingResponse[]> {
    return await db.select().from(bookings);
  }

  async getBooking(id: number): Promise<BookingResponse | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async createBooking(insertBooking: CreateBookingRequest): Promise<BookingResponse> {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async updateBooking(id: number, updates: UpdateBookingRequest): Promise<BookingResponse> {
    const [booking] = await db.update(bookings)
      .set(updates)
      .where(eq(bookings.id, id))
      .returning();
    return booking;
  }

  async deleteBooking(id: number): Promise<void> {
    await db.delete(bookings).where(eq(bookings.id, id));
  }
}

export const storage = new DatabaseStorage();
