"use node";

import crypto from "node:crypto";
import { UploadThingError, createRouteHandler, createUploadthing } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";

import { ActionCtx, internalAction } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

globalThis.crypto = crypto as Crypto;

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
        const userId = await getAuthUserId(ctx);

        if (!userId) throw new UploadThingError("Uploadthing middleware: Unauthorized");

        // Whatever is returned here is accessible in onUploadComplete as `metadata`
        return { userId };
      })
      .onUploadComplete(({ file, metadata }) => {
        return {
          uploadedBy: metadata.userId,
          imageUrl: file.ufsUrl,
        };
      }),
  } satisfies FileRouter;

  return uploadRouter;
};

export const handleUploadthingRequest = internalAction(
  async (
    ctx,
    {
      url,
      method,
      headers,
      body,
    }: {
      url: string;
      method: string;
      headers: Record<string, string>;
      body: string | null;
    }
  ) => {
    const uploadRouter = createUploadRouter(ctx);
    const uploadthingHandler = createRouteHandler({
      router: uploadRouter,
      config: {
        token: process.env.UPLOADTHING_TOKEN,
        logLevel: "Debug",
      },
    });

    // Put the Request object back together to pass to the uploadthing handler
    const request = new Request(url, {
      method,
      headers: new Headers(headers),
      body: body,
    });

    const response = await uploadthingHandler(request);

    // Extract the response details because Convex doesn't support the Response type for a prop
    const responseBody = await response.text();
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body: responseBody,
    };
  }
);

export type UploadRouter = ReturnType<typeof createUploadRouter>;
