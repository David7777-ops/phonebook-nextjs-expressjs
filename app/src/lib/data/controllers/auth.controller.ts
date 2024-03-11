"use server";

import { API_URL, BASE_URL } from "@/lib/config/constants";
import { Login, SignUp } from "@/lib/data/schemas/auth";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login({ email, password }: Login) {
  const response = await fetch(API_URL.concat("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  const resJson = await response.json();
  if (resJson.success) {
    cookies().set("accessToken", resJson.accessToken);
    redirect("/");
  } else {
    return "Invalid Credentials";
  }
}

export async function signUp({ email, password, name, phoneNumber }: SignUp) {
  const response = await fetch(API_URL.concat("/auth/signUp"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, phoneNumber }),
  });

  const resJson = await response.json();

  if (resJson.success) {
    return await login({ email, password });
  } else {
    if (resJson.status === 409) return "Email already registered";
    else return "Something went wrong";
  }
}

export async function jwtVerify(token: string) {
  const response = await fetch(API_URL.concat("/auth/verifyToken"), {
    method: "GET",
    headers: {
      Cookie: serialize(
        "accessToken",
        cookies().get("accessToken")?.value || ""
      ),
    },
  });
  const resJson = await response.json();
  if (resJson.success) {
    return true;
  } else {
    return false;
  }
}
