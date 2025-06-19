"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { LoginUserDto } from "@schema/user";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

export const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: Props) => {
  const router = useRouter();
  const [currentProjectId, setCurrentProjectId ] = useState<string>("");
  const login = async (user: LoginUserDto) => {};

  const signup = async () => {};

  const refreshToken = async () => {};

//   const logout = async () => {
//     await clearSession();
//     // useLogin();
//     router.push("/login");
//   };

useEffect(() => {
    console.log("hmm why", currentProjectId)
}, [currentProjectId])

  return (
    <SessionContext.Provider value={{ login, signup, refreshToken,  currentProjectId, setCurrentProjectId}}>
      {children}
    </SessionContext.Provider>
  );
};
