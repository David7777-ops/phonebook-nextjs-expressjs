import useSWR from "swr";
import { API_URL } from "@/lib/config/constants";
import { getContact } from "@/lib/data/controllers/contacts.controller";

export function useContact(id: string) {
  const { data, error, isLoading } = useSWR([id, "getContact"], ([id]) =>
    getContact(id)
  );
  return {
    contact: data,
    isLoading,
    isError: error,
  };
}
