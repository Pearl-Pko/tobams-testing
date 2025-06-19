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
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import BoardView from "./_components/BoardView";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProject, getProjects, getTasks } from "@/services/project";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { CreateProjectSchema } from "@/schema/project";
import CreateTask from "./CreateTask";

export default function Home() {
  const [view, setView] = useState<"board" | "add">("board");
  const [createProjectDialogOpen, setCreateProjectDialogOpen] = useState(false);
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(CreateProjectSchema),
  });

  const productsQuery = useInfiniteQuery({
    queryFn: getProjects,
    queryKey: ["projects"],

    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.currentPage === lastPage.pagination.totalPages
        ? undefined
        : lastPage.pagination.currentPage + 1,
  });

  const products = productsQuery.data?.pages.flatMap((page) => page.data) || [];

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

  const addProjectMut = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setCreateProjectDialogOpen(false);
    },
    onError: (error) => {
      console.error("error");
    },
  });

  const handleSubmit = async (formData: CreateProjectSchema) => {
    console.log("trieddd");
    addProjectMut.mutate(formData);
  };

  console.log("prd", products);
  return (
    <div className="h-full flex flex-col">
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
      {/* Empty products*/}
      {products.length === 0 && (
        <div className="flex-1 py-4 ">
          <div className="flex items-center justify-center rounded-xl h-full flex-col border-dashed border-2 border-secondary/10">
            <p className="font-semibold text-4xl my-6">Create Project</p>
            <p className="my-3">
              You have no projects yet. Create one to get started
            </p>
            <Dialog
              open={createProjectDialogOpen}
              onOpenChange={setCreateProjectDialogOpen}
            >
              <DialogTrigger>
                <div className="p-5 rounded-full bg-secondary/10">
                  <AddIcon />
                </div>
              </DialogTrigger>
              <DialogContent>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="flex flex-col"
                >
                  <DialogHeader>
                    <DialogTitle>
                      <p>Add Project</p>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="my-4 flex flex-col gap-3">
                    <div className="">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                          className="border rounded-md p-2"
                          id="name"
                          {...form.register("name")}
                        />
                      </div>
                      {form.formState.errors.name && (
                        <p className="text-red-700">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name">Description</label>
                        <input
                          className="border rounded-md p-2"
                          id="name"
                          {...form.register("description")}
                        />
                      </div>
                      {form.formState.errors.name && (
                        <p className="text-red-700">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="self-end flex items-center justify-center p-3 rounded-lg bg-black"
                  >
                    <p className="text-white">Submit</p>
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}

      {products.length !== 0 && (
        <div>
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
            <div className="flex gap-3 space-y items-center">
              <p>Filter</p>
              <p>Sort</p>
              <div className="bg-secondary/10 rounded-full size-6 flex items-center justify-center ">
                <EllipsisIcon />
              </div>
              <motion.button onClick={() => setCreateTaskDialogOpen(true)} className="bg-black py-2 px-6 rounded-full">
                <p className="text-white">New template</p>
              </motion.button>
            </div>
          </div>
          <div className="mt-6">
            <CreateTask
              dialogOpen={createTaskDialogOpen}
              setDialogOpen={setCreateTaskDialogOpen}
            />

            <BoardView />
          </div>
        </div>
      )}
    </div>
  );
}
