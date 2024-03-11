import { deleteContact } from "@/lib/data/controllers/contacts.controller";
import { Contact } from "@/lib/data/schemas/contact";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import useSWR from "swr";
import { ErrorParagraph } from "./error-paragraph";

export const ContactCard = ({ contact }: { contact: Contact }) => {
  const { mutate } = useSWR("getContacts");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteContact(contact.id || "");
    if (res.success) {
      mutate();
    } else {
      setError("Something went wrong");
    }
    setLoading(false);
  };
  return (
    <div className="relative border-2 border-[#777777] group">
      <div className="absolute top-4 right-4 flex gap-2 group-hover:opacity-100 opacity-0 transition-all">
        <a href={`/edit/${contact.id}`}>
          <Edit className="text-white" />
        </a>
        <button type="button" onClick={handleDelete} disabled={loading}>
          <Trash2 className="text-white" />
        </button>
      </div>
      <Image
        src={contact.image ? contact.image : "/person.webp"}
        width="250"
        height="300"
        alt="avatar"
        className="border-b-2 border-[#777777] w-[250px] h-[300px] object-cover image-center"
      />
      <div className="flex flex-col gap-1 p-1 justify-center items-center min-h-32">
        <p className="text-3xl font-semibold text-[#1E1E1E]">{contact?.name}</p>
        <p className="text-[16px] text-[#808080] group-hover:scale-110 group-hover:font-semibold group-hover:text-[#1E1E1E] transition-all">
          {contact?.phoneNumber}
        </p>
        <p className="text-[16px] text-[#808080]">{contact?.email}</p>
      </div>
      <ErrorParagraph>{error}</ErrorParagraph>
    </div>
  );
};
