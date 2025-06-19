import { AddIcon, AttachmentIcon, CommentIcon, EllipsisIcon } from "@/assets";
import { getTasks } from "@/services/project";
import { Slider } from "@radix-ui/react-slider";
import { useInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { HamburgerIcon } from "lucide-react";
import React from "react";

export default function BoardView() {
  const tasksQuery = useInfiniteQuery({
    queryFn: getTasks,
    queryKey: ["tasks"],

    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.currentPage === lastPage.pagination.totalPages
        ? undefined
        : lastPage.pagination.currentPage + 1,
  });

  const tasks = tasksQuery.data?.pages.flatMap((page) => page.data) || [];

  const totalCount = tasksQuery.data?.pages[0].pagination.totalProducts || 0;

  return (
    <div className="w-[400px] border-2 border-secondary/10 border-dashed p-3 rounded-xl flex flex-col gap-5">
      <div className="flex justify-between">
        <p className="text-secondary">To do ({totalCount})</p>
        <div className="flex gap-2 items-center">
          <div className="bg-secondary/10  rounded-full p-1 inline">
            <AddIcon />
          </div>
          <p className="font-semibold">Add new task</p>
        </div>
      </div>
      {tasks.map((task, index) => {
        return (
          <div
            key={index}
            className="border-2 border-secondary/10 p-3 rounded-lg flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{task.title}</p>
                {task.description && (
                  <p className="text-secondary">{task.description}</p>
                )}
              </div>
              <div className="bg-secondary/10 rounded-full size-6 flex items-center justify-center ">
                <EllipsisIcon />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-2 text-secondary">
                    <HamburgerIcon />
                    <p className="">Progress</p>
                  </div>

                  <p>7/10</p>
                </div>
                <Slider className="w-full" />
              </div>

              <div className="flex justify-between">
                {task.dueDate && (
                  <div className="bg-secondary/10 inline px-4 py-1 rounded-full text-secondary">
                    <p>{format(task.dueDate, "dd MMMM, yyyy")}</p>
                  </div>
                )}
                {/* <div className="flex gap-3">
                  <div className="flex gap-1 items-center">
                    <CommentIcon />
                    <p>7</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <AttachmentIcon />
                    <p>2</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
