import Resizer from "react-image-file-resizer";

/**
 * Function to resize images and convert them to webp extension.
 *
 * @param options - contains the file to be resized, maxWidth of new image and maxHeight.
 *
 *
 * @returns file
 */
export async function resizeImage(options: {
  file: File;
  maxWidth: number;
  maxHeight: number;
}): Promise<File> {
  const { file, maxWidth, maxHeight } = options;
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "WEBP",
      100,
      0,
      (uri) => {
        resolve(uri as File);
      },
      "file"
    );
  });
}
