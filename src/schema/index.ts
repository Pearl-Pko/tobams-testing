import { z } from "zod";

export const PaginatedQuery = z.object({
  page: z.number().min(1).default(1),
  limit: z.number({ required_error: "Password is required" }).min(1).default(1),
});

export type PaginatedQuery = z.infer<typeof PaginatedQuery>;
