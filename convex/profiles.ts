import { v } from "convex/values";

import { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { processProfile } from "./utils";
import { getAuthUserId } from "@convex-dev/auth/server";

export type Profile = Omit<Doc<"profiles">, "images"> & { images: string[] };

export const getCurrentUserProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) return null;

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!profile) return null;

    return await processProfile(ctx, profile);
  },
});

export const getProfileById = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Not authenticated");
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();

    if (!profile) return null;

    return await processProfile(ctx, profile);
  },
});

export const getProfileByMatchId = query({
  args: {
    matchId: v.id("matches"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Not authenticated");
    }

    const match = await ctx.db.get(args.matchId);

    if (!match) {
      throw new Error("Match not found");
    }

    if (match.user1Id !== userId && match.user2Id !== userId) {
      throw new Error("Unauthorized");
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) =>
        q.eq("userId", match.user1Id === userId ? match.user2Id : match.user1Id)
      )
      .unique();

    if (!profile) return null;

    return await processProfile(ctx, profile);
  },
});

export const getPotentialMatches = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Not authenticated");
    }

    const profiles = await ctx.db.query("profiles").collect();
    const profilesWithoutCurrentUser = profiles.filter((p) => p.userId !== userId);
    const profilesWithImages = await Promise.all(
      profilesWithoutCurrentUser.map(async (profile) => await processProfile(ctx, profile))
    );

    const mySwipes = await ctx.db
      .query("swipes")
      .withIndex("by_swiper", (q) => q.eq("swiperId", userId))
      .collect();
    const swipedUserIds = new Set(mySwipes.map((s) => s.swipedId));

    return profilesWithImages.filter((profile) => !swipedUserIds.has(profile.userId));
  },
});

export const createProfile = mutation({
  args: {
    name: v.string(),
    age: v.number(),
    description: v.string(),
    images: v.array(v.union(v.id("_storage"), v.string())),
    uploadProvider: v.union(v.literal("convex"), v.literal("uploadthing")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existingProfile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (existingProfile) {
      throw new Error("Profile already exists");
    }

    return await ctx.db.insert("profiles", {
      userId,
      ...args,
    });
  },
});
