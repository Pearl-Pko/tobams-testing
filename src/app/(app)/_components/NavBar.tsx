"use client";
import { AddIcon, CaretIcon, DarkIcon, LightIcon } from "@/assets";
import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProjects } from "@/services/project";
import { SessionContext } from "@/context/SessionContext";
type SubLink = { id: string; label: string; link: string };

const NavItem = ({
  title,
  subLinks,
  onSubLinkPress,
  selectedSubLinkId,
}: {
  title: string;
  subLinks: SubLink[];
  onSubLinkPress?: (sublink: SubLink) => void;
  selectedSubLinkId: string;
}) => {
  const [selected, setSelected] = useState(false);
  const [subItemSelected, setSubItemSelected] = useState(-1);

  console.log("selected", selected);
  return (
    <div className="flex flex-col">
      <motion.div
        initial={"inactive"}
        animate={selected ? "active" : "inactive"}
        variants={{
          active: { color: "var(--color-black)" },
          inactive: {
            color: "var(--color-secondary)",
          },
        }}
        onClick={() => {
          setSelected((prev) => !prev);
          console.log("daddd");
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
            initial={"active"}
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
                  <div key={index}>
                    <div className="inline-flex items-center gap-5">
                      <div className="h-[1.5px] w-4 bg-secondary/10"></div>
                      <motion.div
                        initial={"inactive"}
                        exit={"inactive"}
                        animate={
                          sublink.id === selectedSubLinkId
                            ? "active"
                            : "inactive"
                        }
                        variants={{
                          inactive: {
                            background: "transparent",
                          },
                          active: {
                            background: "var(--color-secondary)",
                          },
                        }}
                        onClick={() => onSubLinkPress?.(sublink)}
                        className="text-secondary font-semibold px-3 rounded-md"
                      >
                        {sublink.label}
                      </motion.div>
                    </div>
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

  const sessionContext = useContext(
    SessionContext
  ) as SessionContextType | null;

  const projectsQuery = useInfiniteQuery({
    queryFn: getProjects,
    queryKey: ["projects"],

    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.currentPage === lastPage.pagination.totalPages
        ? undefined
        : lastPage.pagination.currentPage + 1,
  });

  const projects = projectsQuery.data?.pages.flatMap((page) => page.data) || [];

  useEffect(() => {
    if (!sessionContext?.currentProjectId && projects.length > 0) {
      sessionContext?.setCurrentProjectId(projects[0].id);
    }
  }, [sessionContext?.currentProjectId, projects]);

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
            subLinks={projects.map((product) => ({
              label: product.name,
              id: product.id,
              link: "",
            }))}
            selectedSubLinkId={sessionContext?.currentProjectId || ""}
            onSubLinkPress={(sublink) => {
              console.log("new project id", sublink.id);
              sessionContext?.setCurrentProjectId(sublink.id);
            }}
          />
          <NavItem
            title={"Tasks"}
            subLinks={[
              { label: "All tasks (11))", link: "" },
              { label: "To do (4)", link: "" },
              { label: "In progress (4)", link: "" },
              { label: "Done (3)", link: "" },
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
            },
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
