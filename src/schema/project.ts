import { Description } from "@radix-ui/react-dialog";
import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
});

export const CreateProjectSchema = ProjectSchema.pick({
  name: true,
  description: true,
});

export type CreateProjectSchema = z.infer<typeof CreateProjectSchema>;

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["TO_DO", "IN_PROGRESS", "DONE"]),
  dueDate: z.date().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  progressTotal: z.number().default(0),
  progressDone: z.number().default(0),
  projectId: z.string(),
  tags: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateTaskSchema = taskSchema.pick({
  title: true,
  description: true,
  status: true,
  dueDate: true,
  priority: true,
  projectId: true,
  tags: true,
});

export type CreateTaskSchema = z.infer<typeof CreateTaskSchema>;
