"use node";

import crypto from "node:crypto";
import {
  type FileRouter,
  UploadThingError,
  createRouteHandler,
  createUploadthing,
} from "uploadthing/server";

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
        console.log("uploadthingNode.ts: createUploadRouter middleware");
        const userId = await getAuthUserId(ctx);

        if (!userId) throw new UploadThingError("Uploadthing middleware: Unauthorized");

        console.log("uploadthingNode.ts: createUploadRouter middleware userId", {
          userId,
        });

        // Whatever is returned here is accessible in onUploadComplete as `metadata`
        return { userId };
      })
      .onUploadComplete(({ file, metadata }) => {
        console.log("uploadthingNode.ts: createUploadRouter onUploadComplete", {
          file,
          metadata,
        });

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
    console.log("uploadthingNode.ts: handleUploadthingRequest start", {
      url,
      method,
      headers,
      body,
    });

    const uploadRouter = createUploadRouter(ctx);
    const uploadthingHandler = createRouteHandler({
      router: uploadRouter,
      config: {
        token: process.env.UPLOADTHING_TOKEN,
        // logLevel: "Debug",
      },
    });

    // Put the Request object back together to pass to the uploadthing handler
    const request = new Request(new URL(url), {
      method,
      headers: new Headers(headers),
      body: body,
    });

    console.log("uploadthingNode.ts: handleUploadthingRequest request", {
      request,
    });

    const response = await uploadthingHandler(request);

    console.log("uploadthingNode.ts: handleUploadthingRequest response", {
      response,
    });

    // Extract the response details because Convex doesn't support the Response type for a prop
    const responseBody = await response.text();
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    console.log("uploadthingNode.ts: handleUploadthingRequest return", {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body: responseBody,
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
