"use client";

import { ContactCard } from "@/components/contact-card";
import { useContacts } from "@/lib/data/hooks/contacts/useContacts";
import { MoreHorizontal, Plus } from "lucide-react";

export default function Page() {
  const { contacts, isLoading } = useContacts();
  return (
    <div className="flex flex-col p-9">
      <div className="flex w-full justify-end px-12 gap-8 mb-9">
        <MoreHorizontal className="w-8 h-8" />
        <a href="/new">
          <Plus className="w-8 h-8" />
        </a>
      </div>
      <div className="grid grid-cols-4 place-items-center gap-y-9">
        {!isLoading &&
          contacts &&
          contacts?.results?.length > 0 &&
          contacts.results.map((contact) => (
            <ContactCard key={contact.toString()} contact={contact} />
          ))}
      </div>
    </div>
  );
}
