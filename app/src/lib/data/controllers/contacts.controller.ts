"use server";

import { API_URL } from "@/lib/config/constants";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { Contact } from "../schemas/contact";

export async function updateContact({
  id,
  data,
}: {
  id: string;
  data: Contact;
}) {
  try {
    const res = await fetch(API_URL.concat("/contacts/".concat(id)), {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Cookie: serialize(
          "accessToken",
          cookies().get("accessToken")?.value || ""
        ),
      },
    });
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function getContact(id: string) {
  try {
    const res = await fetch(API_URL.concat("/contacts/".concat(id)), {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: serialize(
          "accessToken",
          cookies().get("accessToken")?.value || ""
        ),
      },
    });
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function createContact(data: Contact) {
  try {
    const res = await fetch(API_URL.concat("/contacts"), {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Cookie: serialize(
          "accessToken",
          cookies().get("accessToken")?.value || ""
        ),
      },
    });
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function getContacts(): Promise<{
  results: Contact[];
  pagination: {};
}> {
  try {
    const res = await fetch(API_URL.concat("/contacts"), {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: serialize(
          "accessToken",
          cookies().get("accessToken")?.value || ""
        ),
      },
    });
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.log(error);
    return { results: [], pagination: {} };
  }
}
