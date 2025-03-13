import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for authentication if needed
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Proxy request schema for tracking and analytics
export const proxyRequests = pgTable("proxy_requests", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  timestamp: text("timestamp").notNull(),
  userId: integer("user_id").references(() => users.id),
  success: boolean("success").notNull().default(true),
  errorMessage: text("error_message"),
});

export const insertProxyRequestSchema = createInsertSchema(proxyRequests).pick({
  url: true,
  timestamp: true,
  userId: true,
  success: true,
  errorMessage: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProxyRequest = z.infer<typeof insertProxyRequestSchema>;
export type ProxyRequest = typeof proxyRequests.$inferSelect;

// URL validation schema
export const urlSchema = z.object({
  url: z
    .string()
    .url("Please enter a valid URL")
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      {
        message: "URL must begin with http:// or https://",
      }
    ),
});

export type UrlInput = z.infer<typeof urlSchema>;
