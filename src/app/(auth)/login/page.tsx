"use client";
import Button from "@/components/ui/CustomButton";
import { signIn } from "@/services/auth";
import { getUser } from "@/services/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { init } from "next/dist/compiled/webpack/webpack";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState = { error: null };

export default function page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInMut = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const result = await signIn(credentials);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      
      // Optionally, you can set an error state here to display it in the UI
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signInMut.mutate({ email, password });
      }}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="max-w-[600px] w-full">
        <p className="text-center text-2xl font-semibold mb-10">Welcome back</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="border rounded-md p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              className="border rounded-md p-2"
            />
          </div>
        </div>
        {signInMut.error && (
          <div className="bg-red-200 border border-red-300 p-3 my-2">
            {signInMut.error.message}
          </div>
        )}
        {/* <button
          type="submit"
          className="w-full flex items-center justify-center p-3 rounded-lg bg-black mt-7"
        >
          <p className="text-white">Sign In</p>
        </button> */}
        <Button
          className=" mt-7 w-full"
          loading={signInMut.isPending}
          type="submit"
          text="Sign In"
        />
        <div className="my-2">
          <p>
            Don't have an account?{" "}
            <Link href="signup">
              <span className="italic underline">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
