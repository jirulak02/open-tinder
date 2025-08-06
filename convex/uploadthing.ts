import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

export const uploadthingHandler = httpAction(async (ctx, req) => {
  console.log("CUSTOM LOG: httpAction(Convex) req", req);

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

  // Put the Response object back together to pass to the client
  return new Response(uploadthingResponse.body, {
    status: uploadthingResponse.status,
    statusText: uploadthingResponse.statusText,
    headers: uploadthingResponse.headers,
  });
});
