"use server";
import "server-only";
import { prisma } from "@/prisma";
import * as bcrypt from "bcrypt";



export const signIn = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) return null;

  if (!user.password) return null;

  const isValid = await bcrypt.compare(
    password,
    user.password // Assumes you stored hashed password
  );

  console.log("is valid", isValid);

  return isValid
    ? {
        id: user.id,
        email: user.email,
        name: user.name,
        // emailVerified: user.emailVerified,
        image: user.image,
        // Explicitly exclude password
      }
    : null;
};

export const signUp = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
};
