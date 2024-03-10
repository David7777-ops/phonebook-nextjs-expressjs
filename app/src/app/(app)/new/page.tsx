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

const Page = () => {
  const methods = useForm<Contact>({
    resolver: zodResolver(contactSchema),
  });
  const { handleSubmit } = methods;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Contact> = async (_data) => {
    setLoading(true);
    const res = await createContact(_data);
    if (res.success) {
      router.push("/");
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <FormProvider {...methods}>
        <ContactForm>
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
