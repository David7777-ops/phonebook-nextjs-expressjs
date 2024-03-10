import React from "react";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { ImageUploadButton } from "@/components/image-upload-button";
import { useFormContext } from "react-hook-form";
import { ErrorParagraph } from "@/components/error-paragraph";
import { Contact } from "@/lib/data/schemas/contact";

export const ContactForm = ({
  children,
  contact,
}: {
  children?: React.ReactNode;
  contact?: Contact;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Contact>();

  const handleFile = (file: File) => {
    console.log("here", file.name);
  };

  return (
    <div className="flex justify-center items-center py-24 px-44 min-h-screen w-full">
      <div className="flex flex-1">
        <ImageUploadButton handleFile={handleFile} />
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
