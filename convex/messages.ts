import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getMessages = query({
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
      throw new Error("Not authorized to view these messages");
    }

    return await ctx.db
      .query("messages")
      .withIndex("by_match", (q) => q.eq("matchId", args.matchId))
      .order("asc")
      .collect();
  },
});

export const sendMessage = mutation({
  args: {
    matchId: v.id("matches"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const senderId = await getAuthUserId(ctx);

    if (!senderId) {
      throw new Error("Not authenticated");
    }

    const match = await ctx.db.get(args.matchId);

    if (!match) {
      throw new Error("Match not found");
    }

    if (match.user1Id !== senderId && match.user2Id !== senderId) {
      throw new Error("Not authorized to send messages to this match");
    }

    await ctx.db.insert("messages", {
      matchId: args.matchId,
      senderId,
      content: args.content,
      sentAt: Date.now(),
    });
  },
});
