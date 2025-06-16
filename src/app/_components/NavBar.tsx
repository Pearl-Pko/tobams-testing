"use client";
import { AddIcon, CaretIcon, DarkIcon, LightIcon } from "@/assets";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/utils";

const NavItem = ({
  title,
  subLinks,
}: {
  title: string;
  subLinks: { title: string; link: string }[];
}) => {
  const [selected, setSelected] = useState(false);
  const [subItemSelected, setSubItemSelected] = useState(-1);

  console.log("selected", selected);
  return (
    <div
      onClick={() => {
        setSelected((prev) => !prev);
        console.log("daddd");
      }}
      className="flex flex-col"
    >
      <motion.div
        initial={"inactive"}
        animate={selected ? "active" : "inactive"}
        variants={{
          active: { color: "var(--color-black)" },
          inactive: {
            color: "var(--color-secondary)",
          },
        }}
        className="flex items-center justify-between font-semibold py-1"
      >
        <p className="">{title}</p>
        {subLinks.length > 0 && (
          <motion.div
            variants={{
              active: {
                rotate: "90deg",
              },
            }}
          >
            <CaretIcon />
          </motion.div>
        )}
      </motion.div>
      <AnimatePresence>
        {subLinks.length > 0 && selected && (
          <motion.div
            initial={"inactive"}
            animate={"active"}
            exit={"inactive"}
            variants={{
              inactive: {
                height: 0,
              },
              active: {
                height: "auto",
              },
            }}
            className="overflow-hidden"
          >
            <div className="border-secondary/10 border-l-[3px] flex flex-col py-2 gap-2">
              {subLinks.map((sublink, index) => {
                return (
                  <div key={index} className="flex items-center gap-5">
                    <div className="h-[1.5px] w-4 bg-secondary/10"></div>
                    <p className="text-secondary font-semibold">
                      {sublink.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function NavBar() {
  const [lightMode, setLightMode] = useState(true);

  return (
    <div className="w-[300px] h-screen p-3 flex flex-col justify-between">
      <div className="flex flex-col gap-7">
        <div className="text-2xl flex justify-between items-center ">
          <p className="font-bold">Projects</p>
          <div className="p-3 rounded-full bg-secondary/10">
            <AddIcon />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <NavItem title="Team" subLinks={[]} />

          <NavItem
            title={"Projects"}
            subLinks={[
              { title: "All projects (3)", link: "" },
              { title: "Design system", link: "" },
              { title: "User flow", link: "" },
              { title: "Ux research", link: "" },
            ]}
          />
          <NavItem
            title={"Tasks"}
            subLinks={[
              { title: "All tasks (11))", link: "" },
              { title: "To do (4)", link: "" },
              { title: "In progress (4)", link: "" },
              { title: "Done (3)", link: "" },
            ]}
          />

          <NavItem title="Reminders" subLinks={[]} />
          <NavItem title="Messengers" subLinks={[]} />
        </div>
      </div>
      <div className="bg-secondary/10 flex items-center justify-between rounded-full p-1">
        <motion.div
          onClick={() => setLightMode(true)}
          initial={"inactive"}
          animate={lightMode ? "active" : "inactive"}
          variants={{
            active: {
              color: "var(--color-black)",
            },
            inactive: {
              color: "var(--color-secondary)",

            }
          }}
          className={cn(
            "relative flex-1  py-2 flex items-center justify-center text-black rounded-full gap-2"
          )}
        >
          {lightMode && (
            <motion.div
              layoutId="item"
              className="absolute  inset-0 bg-white rounded-full"
            ></motion.div>
          )}
          <div className="z-10 flex items-center justify-center gap-2">
            <LightIcon />
            <p className="font-semibold">Light</p>
          </div>
        </motion.div>
        <div
          onClick={() => setLightMode(false)}
          className={cn(
            "relative flex-1  py-2 flex items-center justify-center text-black rounded-full gap-2"
          )}
        >
          {!lightMode && (
            <motion.div
              layoutId="item"
              className="absolute  inset-0 bg-white rounded-full"
            ></motion.div>
          )}
          <div className="z-10 flex items-center justify-center gap-2">
            <DarkIcon />
            <p className="font-semibold">Dark</p>
          </div>
        </div>
      </div>
    </div>
  );
}
