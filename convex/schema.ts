import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  profiles: defineTable({
    userId: v.id("users"),
    name: v.string(),
    age: v.number(),
    description: v.string(),
    images: v.array(v.id("_storage")),
  }).index("by_user", ["userId"]),

  swipes: defineTable({
    swiperId: v.id("users"),
    swipedId: v.id("users"),
    isLike: v.boolean(),
  })
    .index("by_swiper", ["swiperId"])
    .index("by_swiper_and_swiped", ["swiperId", "swipedId"]),

  matches: defineTable({
    user1Id: v.id("users"),
    user2Id: v.id("users"),
    matchedAt: v.number(),
  })
    .index("by_user1", ["user1Id"])
    .index("by_user2", ["user2Id"]),

  messages: defineTable({
    matchId: v.id("matches"),
    senderId: v.id("users"),
    content: v.string(),
    sentAt: v.number(),
  }).index("by_match", ["matchId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
