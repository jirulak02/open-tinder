import { ImagePickerAsset } from "expo-image-picker";

import { uploadFiles } from "@/utils/uploadthing";
import { Id } from "@convex/_generated/dataModel";

export const uploadImages = async ({
  images,
  uploadProvider,
  convexUploadUrl,
  authToken,
}: {
  images: ImagePickerAsset[];
  uploadProvider: "convex" | "uploadthing";
  convexUploadUrl: string;
  authToken: string;
}): Promise<(Id<"_storage"> | string)[]> => {
  if (uploadProvider === "uploadthing") {
    const files: File[] = [];

    for (const image of images) {
      if (image.file) {
        files.push(image.file);

        continue;
      }

      const imageResponse = await fetch(image.uri);
      const imageBlob = await imageResponse.blob();
      const fileName = image.fileName ?? image.uri.split("/").pop() ?? `image_${Date.now()}.jpg`;
      const mimeType = imageBlob.type ?? image.type ?? "image/jpeg";

      files.push(new File([imageBlob], fileName, { type: mimeType }));
    }

    const uploadResult = await uploadFiles((routeRegistry) => routeRegistry.profileImagesUploader, {
      files,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return uploadResult.map((result) => result.serverData.imageUrl);
  }

  const storageIds = await Promise.all(
    images.map(async (image) => {
      const imageResponse = await fetch(image.uri);
      const imageBlob = await imageResponse.blob();
      const uploadResponse = await fetch(convexUploadUrl, {
        method: "POST",
        headers: { "Content-Type": "image/*" },
        body: imageBlob,
      });
      const { storageId } = await uploadResponse.json();

      return storageId as Id<"_storage"> | undefined;
    })
  );

  return storageIds.filter((storageId): storageId is Id<"_storage"> => Boolean(storageId));
};
