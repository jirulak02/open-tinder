import { v } from "convex/values";

import { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { Profile } from "./profiles";
import { processProfile } from "./utils";
import { getAuthUserId } from "@convex-dev/auth/server";

export type Match = Doc<"matches"> & {
  matchedProfile: Profile;
};

export const getMatches = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Not authenticated");
    }

    const matches = await ctx.db
      .query("matches")
      .filter((q) => q.or(q.eq(q.field("user1Id"), userId), q.eq(q.field("user2Id"), userId)))
      .collect();

    return await Promise.all(
      matches.map(async (match) => {
        const matchedUserId = match.user1Id === userId ? match.user2Id : match.user1Id;
        const matchedProfile = await ctx.db
          .query("profiles")
          .withIndex("by_user", (q) => q.eq("userId", matchedUserId))
          .unique();

        if (!matchedProfile) {
          throw new Error("Matched profile not found");
        }

        return {
          ...match,
          matchedProfile: await processProfile(ctx, matchedProfile),
        };
      })
    );
  },
});

export const revokeMatch = mutation({
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

    const otherUserId = match.user1Id === userId ? match.user2Id : match.user1Id;
    const swipe = await ctx.db
      .query("swipes")
      .withIndex("by_swiper_and_swiped", (q) =>
        q.eq("swiperId", userId).eq("swipedId", otherUserId)
      )
      .unique();

    if (swipe) {
      await ctx.db.patch(swipe._id, {
        isLike: false,
      });
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_match", (q) => q.eq("matchId", args.matchId))
      .collect();
    await Promise.all(messages.map((message) => ctx.db.delete(message._id)));

    await ctx.db.delete(args.matchId);
  },
});
