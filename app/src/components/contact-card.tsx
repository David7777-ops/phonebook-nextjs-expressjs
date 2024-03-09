import { Edit, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

export const ContactCard = () => {
  return (
    <div className="relative border-2 border-[#777777] group">
      <div className="absolute top-4 right-4 flex gap-2 group-hover:opacity-100 opacity-0 transition-all">
        <a href="/edit">
          <Edit className="text-white" />
        </a>
        <button>
          <Trash2 className="text-white" />
        </button>
      </div>
      <Image
        src="/person.webp"
        width="250"
        height="300"
        alt="avatar"
        className="border-b-2 border-[#777777]"
      />
      <div className="flex flex-col gap-1 p-1 justify-center items-center min-h-32">
        <p className="text-3xl font-semibold text-[#1E1E1E]">John Doe</p>
        <p className="text-[16px] text-[#808080] group-hover:scale-110 group-hover:font-semibold group-hover:text-[#1E1E1E] transition-all">
          +1(123)456-789
        </p>
        <p className="text-[16px] text-[#808080]">example@email.com</p>
      </div>
    </div>
  );
};
