import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    name: v.string(),
    age: v.number(),
    description: v.string(),
    imageUrl: v.string(),
  }),
});
