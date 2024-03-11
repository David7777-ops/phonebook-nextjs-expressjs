import React, { useEffect, useState } from "react";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { ImageUploadButton } from "@/components/image-upload-button";
import { useFormContext } from "react-hook-form";
import { ErrorParagraph } from "@/components/error-paragraph";
import { Contact } from "@/lib/data/schemas/contact";

export const ContactForm = ({
  children,
  contact,
  file,
  setFile,
}: {
  children?: React.ReactNode;
  contact?: Contact;
  file?: File;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}) => {
  const {
    register,
    reset,
    formState: { errors },
  } = useFormContext<Contact>();

  useEffect(() => {
    reset({
      email: contact?.email,
      name: contact?.name,
      phoneNumber: contact?.phoneNumber,
      image: contact?.image,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact]);

  const handleFile = (file: File | undefined) => {
    if (file) {
      setFile(file);
    } else {
      setFile(undefined);
      reset({ image: "" });
    }
  };

  return (
    <div className="flex justify-center items-center py-24 px-44 min-h-screen w-full">
      <div className="flex flex-1">
        <ImageUploadButton image={contact?.image} handleFile={handleFile} />
      </div>
      <div className="flex flex-col flex-1 relative">
        {children}
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Name:</Label>
            <Input id="name" type="text" {...register("name")} />
            <ErrorParagraph>{errors?.name?.message}</ErrorParagraph>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="phone">phone:</Label>
            <Input id="phone" type="text" {...register("phoneNumber")} />
            <ErrorParagraph>{errors?.phoneNumber?.message}</ErrorParagraph>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="email">Email:</Label>
            <Input id="email" type="email" {...register("email")} />
            <ErrorParagraph>{errors?.email?.message}</ErrorParagraph>
          </div>
        </div>
      </div>
    </div>
  );
};
