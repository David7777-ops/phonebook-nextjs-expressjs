"use client";
import { STORAGE_URL } from "@/lib/config/constants";
import { resizeImage } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export async function uploadImage(options: {
  file: File;
  fileName: string;
  bucket: string;
  folderName: string;
}) {
  const { file, fileName, folderName, bucket } = options;
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`${folderName}/${fileName}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data);
    console.log(error);
    return STORAGE_URL({ fileName, folderName });
  } catch (error) {
    console.log(error);
  }
  return "";
}

export async function uploadContactImage(options: {
  file: File;
  fileName: string;
}): Promise<string> {
  const { fileName, file } = options;
  const bucket = "contacts";
  const folderName = "profile";
  const resizedFile = await resizeImage({
    file,
    maxWidth: 500,
    maxHeight: 500,
  });
  return await uploadImage({ file: resizedFile, fileName, folderName, bucket });
}

export async function deleteImage(options: {
  fileName: string;
  bucket: string;
  folderName: string;
}) {
  const { fileName, folderName, bucket } = options;
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([`${folderName}/${fileName}`]);
}

export async function deleteContactImage(fileName: string) {
  const bucket = "contacts";
  const folderName = "profile";
  return await deleteImage({ fileName, folderName, bucket });
}
