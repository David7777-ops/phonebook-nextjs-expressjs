import { ContactCard } from "@/components/contact-card";
import { MoreHorizontal, Plus } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col p-9">
      <div className="flex w-full justify-end px-12 gap-8 mb-9">
        <MoreHorizontal className="w-8 h-8" />
        <a href="/new">
          <Plus className="w-8 h-8" />
        </a>
      </div>
      <div className="grid grid-cols-4 place-items-center gap-y-9">
        {Array.from(Array(8).keys()).map((i) => (
          <ContactCard key={i.toString()} />
        ))}
      </div>
    </div>
  );
}
