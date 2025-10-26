import { type Campaign, type InsertCampaign, campaigns } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getCampaign(id: string): Promise<Campaign | undefined>;
  getAllCampaigns(): Promise<Campaign[]>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined>;
}

export class DbStorage implements IStorage {
  async getCampaign(id: string): Promise<Campaign | undefined> {
    const results = await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.id, id))
      .limit(1);
    
    return results[0];
  }

  async getAllCampaigns(): Promise<Campaign[]> {
    return db
      .select()
      .from(campaigns)
      .orderBy(desc(campaigns.createdAt));
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    // Simulate some initial metrics based on budget
    const dailySpend = Math.floor(insertCampaign.dailyBudget * 0.8);
    const totalClicks = Math.floor(dailySpend / 3); // Rough cost per click estimation
    const clickThroughRate = (Math.random() * 2 + 2).toFixed(2); // 2-4% CTR
    
    const results = await db
      .insert(campaigns)
      .values({
        ...insertCampaign,
        status: 'active',
        dailySpend,
        totalClicks,
        clickThroughRate,
      })
      .returning();
    
    return results[0];
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined> {
    const results = await db
      .update(campaigns)
      .set(updates)
      .where(eq(campaigns.id, id))
      .returning();
    
    return results[0];
  }
}

export const storage = new DbStorage();
