import { Contact, User } from "@prisma/client";
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const userData = {
  email: "a@cultiv.com",
  name: "Adam",
  password: "a12345678",
  phoneNumber: "+1(123)456-789",
};

export const contactsData: PartialBy<Contact, "id" | "uid">[] = [
  {
    email: "example@email.com",
    name: "Linda Fae",
    image:
      "https://riusiblhrrxmzngdkzds.supabase.co/storage/v1/object/public/contacts/profile/Rectangle-31.webp",
    phoneNumber: "+1(123)456-789",
  },
  {
    email: "example@email.com",
    name: "John Pratt",
    image:
      "https://riusiblhrrxmzngdkzds.supabase.co/storage/v1/object/public/contacts/profile/Rectangle-31-1.webp",
    phoneNumber: "+1(123)456-978",
  },
  {
    email: "example@email.com",
    name: "Mike Watson",
    image:
      "https://riusiblhrrxmzngdkzds.supabase.co/storage/v1/object/public/contacts/profile/Rectangle-31-2.webp",
    phoneNumber: "+1(123)456-897",
  },
  {
    email: "example@email.com",
    name: "Leila",
    image:
      "https://riusiblhrrxmzngdkzds.supabase.co/storage/v1/object/public/contacts/profile/Rectangle-31-3.webp",
    phoneNumber: "+1(123)456-111",
  },
  {
    email: "example@email.com",
    name: "Frida Tan",
    image:
      "https://riusiblhrrxmzngdkzds.supabase.co/storage/v1/object/public/contacts/profile/Rectangle-31-4.webp",
    phoneNumber: "+1(123)456-222",
  },
  {
    email: "example@email.com",
    name: "Mohammed",
    image:
      "https://riusiblhrrxmzngdkzds.supabase.co/storage/v1/object/public/contacts/profile/Rectangle-31-5.webp",
    phoneNumber: "+1(123)456-333",
  },
  {
    email: "example@email.com",
    name: "Christine",
    image:
      "https://riusiblhrrxmzngdkzds.supabase.co/storage/v1/object/public/contacts/profile/Rectangle-31-6.webp",
    phoneNumber: "+1(123)456-444",
  },
  {
    email: "example@email.com",
    name: "Ronald",
    image:
      "https://riusiblhrrxmzngdkzds.supabase.co/storage/v1/object/public/contacts/profile/Rectangle-31-7.webp",
    phoneNumber: "+1(123)456-555",
  },
];
