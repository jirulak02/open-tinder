import { Doc, Id } from "./_generated/dataModel";
import { QueryCtx } from "./_generated/server";

export const processProfile = async (ctx: QueryCtx, profile: Doc<"profiles">) => {
  const profileImages = await Promise.all(
    profile.images.map((image) =>
      profile.uploadProvider === "convex" ? ctx.storage.getUrl(image as Id<"_storage">) : image
    )
  );

  return {
    ...profile,
    images: profileImages.filter((image): image is string => Boolean(image)),
  };
};
