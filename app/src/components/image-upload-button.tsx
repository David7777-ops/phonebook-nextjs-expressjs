"use client";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

export const ImageUploadButton = ({
  handleFile,
  image,
}: {
  handleFile: (file: File | undefined) => void;
  image?: string;
}) => {
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const [fileURL, setFileURL] = useState<string | undefined>("");

  useEffect(() => {
    setFileURL(image);
  }, [image]);

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
    handleFile(undefined);
    setFileURL(undefined);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    hiddenFileInput?.current?.click();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      const fileUploaded = event.target.files[0];
      if (fileUploaded) {
        handleFile(fileUploaded);
        setFileURL(URL.createObjectURL(fileUploaded));
      }
    }
  };
  return (
    <>
      {fileURL ? (
        <div className="relative border-2 border-[#777777] group">
          <div className="absolute top-4 right-4 flex gap-2 group-hover:opacity-100 opacity-0 transition-all">
            <button type="button" onClick={handleClick}>
              <Edit className="text-white" />
            </button>
            <button type="button" onClick={handleDelete}>
              <Trash2 className="text-white" />
            </button>
          </div>
          <Image
            src={fileURL || ""}
            width="448"
            height="540"
            alt="avatar"
            className="object-cover image-center w-[448px] h-[540px]"
          />
        </div>
      ) : (
        <button className="relative group" onClick={handleClick} type="button">
          <p className="group-hover:opacity-100 transition-all delay-75 ease-in-out absolute text-white top-16 left-[134px] text-left text-4xl font-semibold opacity-0">
            Add Photo
          </p>
          <Image
            src="/person.webp"
            width="448"
            height="540"
            alt="add photo button"
          />
        </button>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }}
      />
    </>
  );
};
