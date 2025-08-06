"use node";

import { UploadThingError, createRouteHandler, createUploadthing } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";

import { ActionCtx, internalAction } from "./_generated/server";
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
    console.log("CUSTOM LOG: internalAction(Nodejs) req props", {
      url,
      method,
      headers,
      body,
    });
    console.log(
      "CUSTOM LOG: internalAction(Nodejs) hasUploadthingToken",
      !!process.env.UPLOADTHING_TOKEN
    );

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

    console.log("CUSTOM LOG: internalAction(Nodejs) response", response);

    // Extract the response details because Convex doesn't support the Response type for a prop
    const responseBody = await response.text();
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    console.log("CUSTOM LOG: internalAction(Nodejs) responseBody", responseBody);

    return {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body: responseBody,
    };
  }
);

export type UploadRouter = ReturnType<typeof createUploadRouter>;
