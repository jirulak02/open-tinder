import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAllProfiles = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.query("profiles").collect();
  },
});

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

    const profileImages = await Promise.all(
      profile.images.map((image) => ctx.storage.getUrl(image))
    );

    return {
      ...profile,
      images: profileImages.filter((image): image is string => Boolean(image)),
    };
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

    const profileImages = await Promise.all(
      profile.images.map((image) => ctx.storage.getUrl(image))
    );

    return {
      ...profile,
      images: profileImages.filter((image): image is string => Boolean(image)),
    };
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
      profilesWithoutCurrentUser.map(async (profile) => {
        const profileImages = await Promise.all(
          profile.images.map((image) => ctx.storage.getUrl(image))
        );

        return {
          ...profile,
          images: profileImages.filter((image): image is string => Boolean(image)),
        };
      })
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
    images: v.array(v.id("_storage")),
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
