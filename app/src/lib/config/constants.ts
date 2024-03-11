export const PAGE_LIMIT = 8;
export const PHONE_REGEX = new RegExp(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
);
export const isDev = process.env.NODE_ENV !== "production";

export const BASE_URL = isDev
  ? "http://localhost:3000"
  : // TODO: Update on deploy
    "http://localhost:3000";

export const API_URL = isDev
  ? "http://localhost:8080/api"
  : // TODO: Update on deploy
    "https://phonebook-app-czdu.onrender.com/api";
export const STORAGE_URL = ({
  fileName,
  folderName,
}: {
  fileName: string;
  folderName: string;
}) =>
  "https://riusiblhrrxmzngdkzds.supabase.co/storage/v1/object/public/contacts" +
  `/${folderName}` +
  `/${fileName}`;
