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
    const files = await Promise.all(
      images.map(async (image) => {
        if (image.file) {
          return Object.assign(image.file, { uri: image.uri });
        }

        const imageResponse = await fetch(image.uri);
        const imageBlob = await imageResponse.blob();
        const fileName = image.fileName ?? image.uri.split("/").pop() ?? "unknown-filename";
        const fileType = image.mimeType ?? image.type ?? "application/octet-stream";
        const file = new File([imageBlob], fileName, { type: fileType });

        return Object.assign(file, { uri: image.uri });
      })
    );

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
