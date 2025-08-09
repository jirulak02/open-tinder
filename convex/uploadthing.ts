import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

export const uploadthingOptionsHandler = httpAction(async (ctx, req) => {
  console.log("uploadthing.ts: uploadthingOptionsHandler start", {
    req,
  });

  return new Response(null, {
    status: 204,
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": "86400",
    }),
  });
});

export const uploadthingHandler = httpAction(async (ctx, req) => {
  console.log("uploadthing.ts: uploadthingHandler start", {
    req,
  });

  // Extract the request details because Convex doesn't support the Request type for a prop
  const url = req.url;
  const method = req.method;
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });
  let body: string | null = null;
  if (method !== "GET" && method !== "HEAD") {
    body = await req.text();
  }

  console.log("uploadthing.ts: uploadthingHandler processed", {
    url,
    method,
    headers,
    body,
  });

  // Call the internal action that runs in Node.js (uploadthing needs to run in Node.js to avoid import errors)
  const uploadthingResponse = await ctx.runAction(
    internal.uploadthingNode.handleUploadthingRequest,
    {
      url,
      method,
      headers,
      body,
    }
  );

  console.log("uploadthing.ts: uploadthingHandler uploadthingResponse", {
    uploadthingResponse,
  });

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "*",
    ...uploadthingResponse.headers,
  };

  console.log(
    "uploadthing.ts: uploadthingHandler return",
    new Response(uploadthingResponse.body, {
      status: uploadthingResponse.status,
      statusText: uploadthingResponse.statusText,
      headers: new Headers(corsHeaders),
    })
  );

  // Put the Response object back together to pass to the client
  return new Response(uploadthingResponse.body, {
    status: uploadthingResponse.status,
    statusText: uploadthingResponse.statusText,
    headers: new Headers(corsHeaders),
  });
});
