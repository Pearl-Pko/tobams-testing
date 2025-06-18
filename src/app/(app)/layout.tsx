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
      <div className="p-6 flex-1">{children}</div>
    </div>
  );
}
