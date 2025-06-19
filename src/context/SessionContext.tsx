"use client";

import { createContext, useEffect } from "react";
import { useLogin, useRefreshToken } from "../service/useUser";
import api from "../utils/api";
import { AxiosError, AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import { clearSession } from "../actions/auth";
import { LoginUserDto } from "@schema/user";
import { SessionContextType } from "../types/session";
import { CallbackMessage } from "../app/(auth)/callback/page";
import { isPublic } from "../lib/utils";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

export const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const login = async (user: LoginUserDto) => {};

  const signup = async () => {};

  const refreshToken = async () => {};

  const logout = async () => {
    await clearSession();
    // useLogin();
    router.push("/login");
  };


  return (
    <SessionContext.Provider value={{ login, signup, refreshToken, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
