import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateTaskSchema } from "@/schema/project";
import { createTask } from "@/services/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { X, Ban } from "lucide-react";
import { SessionContext } from "@/context/SessionContext";

export default function CreateTask({
  dialogOpen,
  setDialogOpen,
}: {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}) {
  const sessionContext = useContext(
    SessionContext
  ) as SessionContextType | null;

  const queryClient = useQueryClient();
  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      status: "TO_DO",
      tags: [],
      projectId: sessionContext?.currentProjectId || "",
    },
  });

  const addTaskMut = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setDialogOpen(false);
    },
    onError: (error) => {
      console.error("error");
    },
  });

  const handleSubmit = async (formData: CreateTaskSchema) => {
    console.log("project id", formData.projectId);
    addTaskMut.mutate(formData);
  };

  const values = form.getValues();

  useEffect(() => {
    if (sessionContext?.currentProjectId) {
      form.setValue("projectId", sessionContext.currentProjectId);
    }
  }, [sessionContext?.currentProjectId, form]);

  console.log("setting project id", sessionContext?.currentProjectId);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <p className="font-semibold text-lg">Add Task</p>
        </DialogHeader>
        <form
          className="flex flex-col"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="my-4 flex flex-col gap-3">
            <div className="">
              <div className="flex flex-col gap-2">
                <input
                  className="border rounded-md p-2"
                  id="name"
                  placeholder="Task Name"
                  {...form.register("title")}
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
                <textarea
                  placeholder="Task Description"
                  className="border rounded-md p-2 resize-none min-h-20"
                  id="name"
                  {...form.register("description")}
                />
              </div>
              {form.formState.errors.description && (
                <p className="text-red-700">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Controller
                control={form.control}
                name="status"
                render={({ field: { onChange, value } }) => {
                  const [open, setOpen] = useState(false);

                  return (
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger>
                        <div className="border border-secondary px-2 py-1 rounded-lg">
                          <p>
                            {value === "TO_DO"
                              ? "TO DO"
                              : value === "IN_PROGRESS"
                              ? "In Progress"
                              : "Done"}
                          </p>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-36 flex flex-col gap-2 items-start"
                      >
                        <button
                          className="w-full flex items-start"
                          onClick={() => {
                            onChange("TO_DO");
                            setOpen(false);
                          }}
                        >
                          <p>TO DO</p>
                        </button>
                        <button
                          className="w-full flex items-start"
                          onClick={() => {
                            onChange("IN_PROGRESS");
                            setOpen(false);
                          }}
                        >
                          <p>IN PROGRESS</p>
                        </button>
                        <button
                          className="w-full flex items-start"
                          onClick={() => {
                            onChange("DONE"), setOpen(false);
                          }}
                        >
                          <p>DONE</p>
                        </button>
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />

              <Popover>
                <PopoverTrigger>
                  <div className="border border-secondary px-2 py-1 rounded-lg">
                    <p>Asignees</p>
                  </div>
                </PopoverTrigger>
              </Popover>
              <Controller
                control={form.control}
                name="dueDate"
                render={({ field: { onChange, value } }) => {
                  return (
                    <Popover>
                      <PopoverTrigger>
                        <div className="border border-secondary px-2 py-1 rounded-lg">
                          {!value ? (
                            <p>Due date</p>
                          ) : (
                            <div className="flex gap-1 items-center">
                              <CalendarIcon size={18} />
                              <p>{format(value, "d, MMM")}</p>
                              <button onClick={() => onChange(null)}>
                                <X size={18} />
                              </button>
                            </div>
                          )}
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          required
                          mode="single"
                          selected={value}
                          onSelect={(date) => onChange(date)}
                        />
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />

              <Controller
                control={form.control}
                name="priority"
                render={({ field: { onChange, value } }) => {
                  const [open, setOpen] = useState(false);

                  return (
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger>
                        <div className="border border-secondary px-2 py-1 rounded-lg">
                          <p>{value || "Priority"}</p>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-36 flex flex-col gap-2 items-start"
                      >
                        <div className="flex flex-col gap-2">
                          <button
                            className="w-full flex items-start"
                            onClick={() => {
                              onChange("HIGH");
                              setOpen(false);
                            }}
                          >
                            <p>HIGH</p>
                          </button>
                          <button
                            className="w-full flex items-start"
                            onClick={() => {
                              onChange("MEDIUM");
                              setOpen(false);
                            }}
                          >
                            <p>MEDIUM</p>
                          </button>
                          <button
                            className="w-full flex items-start"
                            onClick={() => {
                              onChange("LOW"), setOpen(false);
                            }}
                          >
                            <p>LOW</p>
                          </button>
                        </div>
                        <div className="inline-block h-2 w-full border-black"></div>
                        <button
                          onClick={() => {
                            onChange(null);
                            setOpen(false);
                          }}
                        >
                          <p>Clear</p>
                        </button>
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />
              <Popover>
                <PopoverTrigger>
                  <div className="border border-secondary px-2 py-1 rounded-lg">
                    <p>Tags</p>
                  </div>
                </PopoverTrigger>
              </Popover>
            </div>
          </div>
          <button
            type="submit"
            className="self-end flex items-center justify-center p-3 rounded-lg bg-black"
          >
            <p className="text-white">Create Task</p>
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
