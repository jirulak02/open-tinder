import { ImagePickerAsset } from "expo-image-picker";
import { Platform } from "react-native";

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
  console.log("uploadImages start");
  if (uploadProvider === "uploadthing") {
    const files = await Promise.all(
      images.map(async (image) => {
        const imageResponse = await fetch(image.uri);
        const imageBlob = await imageResponse.blob();
        const fileName = image.fileName ?? image.uri.split("/").pop() ?? "unknown-filename";
        const fileType = image.mimeType ?? image.type ?? "application/octet-stream";
        const file = new File([imageBlob], fileName, { type: fileType });

        if (Platform.OS === "web") {
          // Do NOT attach `uri` on web
          return file;
        }

        // On native (iOS/Android), provide the RN FormData-friendly shape
        return Object.assign(file, { uri: image.uri });
      })
    );

    console.log("uploadImages files", files);

    const uploadResult = await uploadFiles((routeRegistry) => routeRegistry.profileImagesUploader, {
      files,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("uploadImages uploadResult", uploadResult);

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

  console.log("uploadImages end");

  return storageIds.filter((storageId): storageId is Id<"_storage"> => Boolean(storageId));
};
