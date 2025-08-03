import { UploadThingError, createRouteHandler, createUploadthing } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";

import { ActionCtx, httpAction } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const f = createUploadthing();

const createUploadRouter = (ctx: ActionCtx) => {
  const uploadRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    profileImagesUploader: f({
      image: {
        /**
         * For full list of options and defaults, see the File Route API reference
         * @see https://docs.uploadthing.com/file-routes#route-config
         */
        maxFileSize: "4MB",
        minFileCount: 1,
        maxFileCount: 4,
      },
    })
      .middleware(async () => {
        console.log("uploadthing middleware");

        const userId = await getAuthUserId(ctx);

        if (!userId) throw new UploadThingError("Unauthorized");

        console.log("uploadthing middleware done for user", userId);

        // Whatever is returned here is accessible in onUploadComplete as `metadata`
        return { userId };
      })
      .onUploadComplete(({ file, metadata }) => {
        console.log("uploadthing onUploadComplete");

        return {
          uploadedBy: metadata.userId,
          imageUrl: file.ufsUrl,
        };
      }),
  } satisfies FileRouter;

  return uploadRouter;
};

export const uploadthingHandler = httpAction(async (ctx, req) => {
  console.log("uploadthingHandler");

  const uploadRouter = createUploadRouter(ctx);

  const uploadthingHandler = createRouteHandler({
    router: uploadRouter,
    config: {
      token: process.env.UPLOADTHING_TOKEN,
      logLevel: "Debug",
    },
  });

  console.log("uploadthingHandler done");

  return uploadthingHandler(req);
});

export type UploadRouter = ReturnType<typeof createUploadRouter>;
