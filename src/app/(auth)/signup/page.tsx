"use client";
import { signup as signUpAction } from "@/actions/auth";
import Button from "@/components/ui/CustomButton";
import { signUp } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";

const initialState = { error: null };

export default function page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const signUpMut = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signUpMut.mutate({ email, password, name });
      }}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="max-w-[600px] w-full">
        <p className="text-center text-2xl font-semibold mb-10">Welcome!</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              id="name"
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="border rounded-md p-2"
            />
          </div>
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
        {signUpMut.error && (
          <div className="bg-red-200 border border-red-300 p-3 my-2">
            {signUpMut.error.message}
          </div>
        )}

        <Button
          className=" mt-7 w-full"
          loading={signUpMut.isPending}
          type="submit"
          text="Sign Up"
        />
        <div className="my-2">
          <p>
            Do you have an account?{" "}
            <Link href="login">
              <span className="italic underline">Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
