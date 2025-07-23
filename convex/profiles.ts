import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const getAllProfiles = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("profiles").collect();
  },
});

export const getProfileById = query({
  args: { id: v.id("profiles") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createProfile = mutation({
  args: {
    name: v.string(),
    age: v.number(),
    description: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("profiles", args);
  },
});
