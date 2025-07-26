import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  profiles: defineTable({
    userId: v.id("users"),
    name: v.string(),
    age: v.number(),
    description: v.string(),
    imageUrl: v.string(),
  }).index("by_user", ["userId"]),

  swipes: defineTable({
    swiperId: v.id("users"),
    swipedId: v.id("users"),
    isLike: v.boolean(),
  })
    .index("by_swiper", ["swiperId"])
    .index("by_swiped", ["swipedId"])
    .index("by_swiper_and_swiped", ["swiperId", "swipedId"]),

  matches: defineTable({
    user1Id: v.id("users"),
    user2Id: v.id("users"),
    matchedAt: v.number(),
  })
    .index("by_user1", ["user1Id"])
    .index("by_user2", ["user2Id"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
