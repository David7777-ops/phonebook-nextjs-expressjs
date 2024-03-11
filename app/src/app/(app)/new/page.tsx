"use client";
import React, { useState } from "react";
import { Button } from "@/components/button";
import { Check, X } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorParagraph } from "@/components/error-paragraph";
import { Contact, contactSchema } from "@/lib/data/schemas/contact";
import { createContact } from "@/lib/data/controllers/contacts.controller";
import { useRouter } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import {
  deleteContactImage,
  uploadContactImage,
} from "@/lib/data/controllers/storage.controller";

const Page = () => {
  const methods = useForm<Contact>({
    resolver: zodResolver(contactSchema),
  });
  const { handleSubmit } = methods;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState<File | undefined>();

  const onSubmit: SubmitHandler<Contact> = async (_data) => {
    setLoading(true);
    let image = "";
    let fileName = "";
    if (file) {
      fileName = `${Date.now()}.webp`;
      image = await uploadContactImage({ file, fileName });
    }
    const res = await createContact({
      ..._data,
      image: image.length > 0 ? image : undefined,
    });
    if (res.success) {
      router.push("/");
    } else {
      setError(res.message);
      if (file) {
        await deleteContactImage(fileName);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <FormProvider {...methods}>
        <ContactForm file={file} setFile={setFile}>
          <div className="flex self-end">
            <ErrorParagraph>{error}</ErrorParagraph>
            <Button variant="ghost" size="lg" type="submit" disabled={loading}>
              <Check className="w-8 h-8" />
            </Button>
            <Button variant="ghost" size="lg" type="button">
              <a href="/">
                <X className="w-8 h-8" />
              </a>
            </Button>
          </div>
        </ContactForm>
      </FormProvider>
    </form>
  );
};

export default Page;
