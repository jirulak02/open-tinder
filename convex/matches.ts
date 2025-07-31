import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

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

        const profileImages = await Promise.all(
          matchedProfile.images.map((image) => ctx.storage.getUrl(image))
        );

        return {
          ...match,
          matchedProfile: {
            ...matchedProfile,
            images: profileImages.filter((image): image is string => Boolean(image)),
          },
        };
      })
    );
  },
});
