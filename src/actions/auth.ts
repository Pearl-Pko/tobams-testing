"use server";

import { signIn } from "@/auth";
import { signUp } from "@/services/auth";
import { redirect } from "next/navigation";

export const signin = async (
  prevState: { error: string | null },
  formData: FormData
) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      
    });
    // console.log("resss", res);
    return { error: null };
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

    const res = await signUp(email, password);
    signIn("credentials", {
      ...formData,
      redirect: false,
    });
    console.log("resss", res);
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Something happened" };
  }
};
