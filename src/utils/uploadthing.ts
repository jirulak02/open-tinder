import { genUploader } from "uploadthing/client";

import { UploadRouter } from "@convex/uploadthing";

export const { uploadFiles } = genUploader<UploadRouter>({
  url: `${process.env.EXPO_PUBLIC_CONVEX_SITE_URL ?? ""}/uploadthing`,
});
