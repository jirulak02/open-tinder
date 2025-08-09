import { httpRouter } from "convex/server";

import { uploadthingHandler, uploadthingOptionsHandler } from "./uploadthing";

const http = httpRouter();

http.route({
  path: "/uploadthing",
  method: "OPTIONS",
  handler: uploadthingOptionsHandler,
});

http.route({
  path: "/uploadthing",
  method: "GET",
  handler: uploadthingHandler,
});

http.route({
  path: "/uploadthing",
  method: "POST",
  handler: uploadthingHandler,
});

export default http;
