"use client";
import { signup as signUpAction } from "@/actions/auth";
import { init } from "next/dist/compiled/webpack/webpack";
import React, { useActionState, useState } from "react";
import { useFormState } from "react-dom";

const initialState = { error: null };

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [state, formAction] = useActionState(signUpAction, initialState);

  return (
    <form
      action={formAction}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="max-w-[600px] w-full">
        <p className="text-center text-2xl font-semibold mb-10">Welcome!</p>
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
        {state.error && <div>Something wrong happened</div>}
        <button
          type="submit"
          className="w-full flex items-center justify-center p-3 rounded-lg bg-black mt-7"
        >
          <p className="text-white">Sign Up</p>
        </button>
      </div>
    </form>
  );
}
