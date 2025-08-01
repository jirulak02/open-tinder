import { v } from "convex/values";

import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const swipeUser = mutation({
  args: {
    swipedUserId: v.id("users"),
    isLike: v.boolean(),
  },
  handler: async (ctx, args) => {
    const swiperId = await getAuthUserId(ctx);

    if (!swiperId) {
      throw new Error("Not authenticated");
    }

    const existingSwipe = await ctx.db
      .query("swipes")
      .withIndex("by_swiper_and_swiped", (q) =>
        q.eq("swiperId", swiperId).eq("swipedId", args.swipedUserId)
      )
      .unique();

    if (existingSwipe) {
      throw new Error("Already swiped on this user");
    }

    const swipeId = await ctx.db.insert("swipes", {
      swiperId,
      swipedId: args.swipedUserId,
      isLike: args.isLike,
    });

    if (args.isLike) {
      const mutualSwipe = await ctx.db
        .query("swipes")
        .withIndex("by_swiper_and_swiped", (q) =>
          q.eq("swiperId", args.swipedUserId).eq("swipedId", swiperId)
        )
        .unique();

      if (mutualSwipe && mutualSwipe.isLike) {
        const matchId = await ctx.db.insert("matches", {
          user1Id: swiperId < args.swipedUserId ? swiperId : args.swipedUserId,
          user2Id: swiperId < args.swipedUserId ? args.swipedUserId : swiperId,
          matchedAt: Date.now(),
        });

        return { swipeId, matchId };
      }
    }

    return { swipeId };
  },
});

export const rewindSwipe = mutation({
  args: {
    swipeId: v.id("swipes"),
    matchId: v.optional(v.id("matches")),
  },
  handler: async (ctx, args) => {
    const swiperId = await getAuthUserId(ctx);

    if (!swiperId) {
      throw new Error("Not authenticated");
    }

    await ctx.db.delete(args.swipeId);

    if (args.matchId) {
      await ctx.db.delete(args.matchId);
    }
  },
});
