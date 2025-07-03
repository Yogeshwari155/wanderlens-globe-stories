import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const travelPosts = pgTable("travel_posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  country: text("country").notNull(),
  description: text("description").notNull(),
  story: text("story").notNull(),
  images: text("images").array().notNull(),
  coverImage: text("cover_image").notNull(),
  tags: text("tags").array().notNull(),
  likes: integer("likes").notNull().default(0),
  date: text("date").notNull(),
  coordinates: text("coordinates"), // JSON string for lat/lng
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTravelPostSchema = createInsertSchema(travelPosts).omit({
  id: true,
});

export const updateTravelPostSchema = createInsertSchema(travelPosts).partial().pick({
  title: true,
  description: true,
  story: true,
  tags: true,
  likes: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type TravelPost = typeof travelPosts.$inferSelect;
export type InsertTravelPost = z.infer<typeof insertTravelPostSchema>;
export type UpdateTravelPost = z.infer<typeof updateTravelPostSchema>;
