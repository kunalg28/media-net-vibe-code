import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  businessName: text("business_name").notNull(),
  websiteUrl: text("website_url").notNull(),
  category: text("category").notNull(),
  campaignGoal: text("campaign_goal").notNull(),
  location: text("location").notNull(),
  audienceTemplate: text("audience_template").notNull(),
  dailyBudget: integer("daily_budget").notNull(),
  status: text("status").notNull().default('active'),
  dailySpend: integer("daily_spend").notNull().default(0),
  totalClicks: integer("total_clicks").notNull().default(0),
  clickThroughRate: decimal("click_through_rate", { precision: 5, scale: 2 }).notNull().default('0'),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  status: true,
  dailySpend: true,
  totalClicks: true,
  clickThroughRate: true,
  createdAt: true,
});

export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;
