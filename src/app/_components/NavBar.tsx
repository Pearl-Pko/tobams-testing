import { AddIcon } from "@/assets";
import React from "react";

export default function NavBar() {
  return (
    <div className="w-[300px] h-screen">
      <div className="text-2xl flex ">
        <p>Projects</p>
        <AddIcon />
      </div>
      <div className="flex items-center justify-between">
        <p>Team</p>
        <AddIcon />
      </div>
      <div className="flex items-center justify-between">
        <p>Projects</p>
        <AddIcon />
      </div>
      <div className="flex items-center justify-between">
        <p>Task</p>
        <AddIcon />
      </div>
      <div className="flex items-center justify-between">
        <p>Reminders</p>
        <AddIcon />
      </div>
      <div className="flex items-center justify-between">
        <p>Messengers</p>
        <AddIcon />
      </div>
    </div>
  );
}
