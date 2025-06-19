"use server";
import "server-only";
import { prisma } from "@/prisma";
import * as bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { createSession } from "@/lib/session";

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw Error("User not found");

  if (!user.password) throw Error("User does not have a password");

  const isValid = await bcrypt.compare(
    password,
    user.password // Assumes you stored hashed password
  );

  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  console.log("is valid", isValid);

  await createSession(user.id);

  return {
    id: user?.id,
    email: user?.email,
    name: user.name,
    // emailVerified: user.emailVerified,
    image: user.image,
    // Explicitly exclude password
  };
};

export const signUp = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: name,
    },
  });
  await createSession(user.id);
  return user;
};

export async function getSession() {
  const session = await cookies();

  const accessToken = session.get("session");
  if (!accessToken) return null;

  return jwtDecode<{ userId: string }>(accessToken?.value);
}

export async function clearSession() {
  const cookie = await cookies();
  cookie.delete("session");
}
