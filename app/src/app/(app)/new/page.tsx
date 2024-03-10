"use client";
import React from "react";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { ImageUploadButton } from "@/components/image-upload-button";
import { Button } from "@/components/button";
import { Check, X } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorParagraph } from "@/components/error-paragraph";
import { Contact, contactSchema } from "@/lib/data/schemas/contact";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    resolver: zodResolver(contactSchema),
  });

  const handleFile = (file: File) => {
    console.log("here", file.name);
  };
  const onSubmit: SubmitHandler<Contact> = async (_data) => {
    console.log(_data);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="flex justify-center items-center py-24 px-44 min-h-screen w-full"
    >
      <div className="flex flex-1">
        <ImageUploadButton handleFile={handleFile} />
      </div>
      <div className="flex flex-col flex-1 relative">
        <div className="flex self-end">
          <Button variant="ghost" size="lg" type="submit">
            <Check className="w-8 h-8" />
          </Button>
          <Button variant="ghost" size="lg" type="button">
            <X className="w-8 h-8" />
          </Button>
        </div>
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
    </form>
  );
};

export default Page;
