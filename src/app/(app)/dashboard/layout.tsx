import React from "react";

import NavBar from "./_components/NavBar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex ">
      <NavBar></NavBar>
      <div className="flex-1 h-screen">
        <div className="p-6 h-full">{children}</div>
      </div>
    </div>
  );
}
