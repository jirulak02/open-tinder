/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as matches from "../matches.js";
import type * as messages from "../messages.js";
import type * as profiles from "../profiles.js";
import type * as router from "../router.js";
import type * as swipes from "../swipes.js";
import type * as uploadthing from "../uploadthing.js";
import type * as uploadthingNode from "../uploadthingNode.js";
import type * as utils from "../utils.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  files: typeof files;
  http: typeof http;
  matches: typeof matches;
  messages: typeof messages;
  profiles: typeof profiles;
  router: typeof router;
  swipes: typeof swipes;
  uploadthing: typeof uploadthing;
  uploadthingNode: typeof uploadthingNode;
  utils: typeof utils;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
