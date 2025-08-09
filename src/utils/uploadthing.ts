import { genUploader } from "uploadthing/client";

import { UploadRouter } from "@convex/uploadthingNode";

export const { uploadFiles } = genUploader<UploadRouter>({
  url: new URL(`${process.env.EXPO_PUBLIC_CONVEX_SITE_URL ?? ""}/uploadthing`),
  fetch: globalThis.fetch,
});
