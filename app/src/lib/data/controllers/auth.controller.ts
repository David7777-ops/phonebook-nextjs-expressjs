"use server";

import { API_URL, BASE_URL } from "@/lib/config/constants";
import { Login, SignUp } from "@/lib/data/schemas/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login({ email, password }: Login) {
  try {
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
      cookies().set("refreshToken", resJson.refreshToken);
      redirect("/");
    } else {
      return "Invalid Credentials";
    }
  } catch (error) {
    return "Something went wrong";
  }
}

export async function signUp({ email, password, name, phoneNumber }: SignUp) {
  try {
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
  } catch (error) {
    return "Something went wrong";
  }
}
