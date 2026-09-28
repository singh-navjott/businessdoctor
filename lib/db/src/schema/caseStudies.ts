import { pgTable, text, serial, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const caseStudies = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  clientName: text("client_name"),
  industry: text("industry"),
  category: text("category"),
  featuredImage: text("featured_image"),
  shortDescription: text("short_description"),
  projectOverview: text("project_overview"),
  challenge: text("challenge"),
  strategy: text("strategy"),
  solution: text("solution"),
  implementation: text("implementation"),
  results: text("results"),
  keyMetrics: jsonb("key_metrics"),
  technologies: text("technologies"),
  imageGallery: jsonb("image_gallery"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  ogImage: text("og_image"),
  published: boolean("published").default(false).notNull(),
  publishedDate: timestamp("published_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCaseStudySchema = createInsertSchema(caseStudies).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
export type CaseStudy = typeof caseStudies.$inferSelect;
