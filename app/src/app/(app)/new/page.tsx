"use client";
import React from "react";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { ImageUploadButton } from "@/components/image-upload-button";
import { Button } from "@/components/button";
import { Check, X } from "lucide-react";

const Page = () => {
  const handleFile = (file: File) => {
    console.log("here", file.name);
  };
  return (
    <div className="flex justify-center items-center py-24 px-44 min-h-screen w-full">
      <div className="flex flex-1">
        <ImageUploadButton handleFile={handleFile} />
      </div>
      <div className="flex flex-col flex-1 relative">
        <div className="flex self-end">
          <Button variant="ghost" size="lg">
            <Check className="w-8 h-8" />
          </Button>
          <Button variant="ghost" size="lg">
            <X className="w-8 h-8" />
          </Button>
        </div>
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Name:</Label>
            <Input id="name" type="text" />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="phone">Number:</Label>
            <Input id="phone" type="text" />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="email">Email:</Label>
            <Input id="email" type="email" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
