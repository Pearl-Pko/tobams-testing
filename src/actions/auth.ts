"use server";
import { createSession } from "@/lib/session";
import { signUp, signIn } from "@/services/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";


export const signin = async (
  prevState: { error: string | null },
  formData: FormData
) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn(email, password);
    if (result) return { error: null };

    // console.log("resss", res);
    return { error: "Email or password is not correct" };
  } catch (error) {
    console.error(error);
    return { error: "Something happened" };
  }
};

export const signup = async (
  prevState: { error: string | null },
  formData: FormData
) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await signUp(email, password);
    await createSession(user.id);
  } catch (error) {
    console.error(error);
    return { error: "Something happened" };
  }
  redirect("/");
};



