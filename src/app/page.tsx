"use client";
import {
  AddIcon,
  BoardIcon,
  CalendarIcon,
  EllipsisIcon,
  Notificationsicon,
  SearchIcon,
} from "@/assets";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";
import BoardView from "./(app)/_components/BoardView";

export default function Home() {
  const [view, setView] = useState<"board" | "add">("board");
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Welcome Back, Vincent</p>
        <div className="flex items-center gap-4">
          <SearchIcon />
          <Notificationsicon />
          <div className="flex items-center">
            <CalendarIcon />
            <p className="text-secondary">19 May 2022</p>
          </div>
          <Image
            alt=""
            className="rounded-full size-10 object-cover"
            width={888}
            height={1280}
            src="/blank-profile.webp"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <div className="relative flex items-center gap-2 px-4 py-2">
            <BoardIcon />
            <p>Board view</p>
            <motion.div className="absolute border-b-2 inset-0"></motion.div>
          </div>
          <div className="relative flex items-center gap-2 px-4 py-2">
            <div className="bg-secondary/10  rounded-full p-1 inline">
              <AddIcon />
            </div>
            <p>Add view</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <p>Filter</p>
          <p>Sort</p>
          <div className="bg-secondary/10 rounded-full size-6 flex items-center justify-center ">
            <EllipsisIcon />
          </div>
          <div className="bg-black py-2 px-6 rounded-full">
            <p className="text-white">New template</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
          <BoardView />
      </div>
    </div>
  );
}
