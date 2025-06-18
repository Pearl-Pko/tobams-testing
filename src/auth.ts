import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod/v4";
import { signInSchema } from "./schema/auth";
import { signIn as signIService } from "./services/auth";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, request) => {
        try {
          let user = null;

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          console.log("what happened");

          // logic to verify if the user exists
          user = await signIService(email, password);

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          // return JSON object with the user data
          console.log("user returned",);
          return user as any;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
});
