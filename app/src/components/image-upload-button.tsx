"use client";
import Image from "next/image";
import { ChangeEventHandler, MouseEventHandler, useRef } from "react";

export const ImageUploadButton = ({
  handleFile,
}: {
  handleFile: (file: File) => void;
}) => {
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    hiddenFileInput?.current?.click();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      const fileUploaded = event.target.files[0];
      handleFile(fileUploaded);
    }
  };
  return (
    <>
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
