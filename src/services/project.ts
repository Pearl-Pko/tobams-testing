"use server";

import { getSession } from "@/actions/auth";
import { prisma } from "@/prisma";
import { PaginatedQuery } from "@/schema";
import { CreateProjectSchema, CreateTaskSchema } from "@/schema/project";
import { Project, Task } from "@prisma/client";
import { QueryFunction } from "@tanstack/react-query";
import { cookies } from "next/headers";

export const createProject = async (projectDto: CreateProjectSchema) => {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("User not authenticated");
    }

    const userId = session.userId;
    const project = await prisma.project.create({
      data: {
        name: projectDto.name,
        description: projectDto.description,
        userId: userId,
      },
    });

    return project;
  } catch (error) {
    console.error(error);
  }
};

export const getProjects: QueryFunction<
  PaginatedResponse<Project>,
  [string],
  number
> = async ({ pageParam, queryKey }) => {
  const totalCount = await prisma.project.count();
  const limit = 10;

  const data = await prisma.project.findMany({
    skip: (pageParam - 1) * limit,
    take: limit,
  });
  return {
    data: data,
    message: "Projects fetched successfully",
    pagination: {
      totalProducts: totalCount,
      currentPage: pageParam,
      pageSize: data.length,
      totalPages: Math.ceil(totalCount / data.length),
    },
  };
};

export const createTask = async (projectDto: CreateTaskSchema) => {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("User not authenticated");
    }

    const project = await prisma.task.create({
      data: {
        title: projectDto.title,
        description: projectDto.description,
        status: projectDto.status,
        dueDate: projectDto.dueDate,
        priority: projectDto.priority,
        projectId: projectDto.projectId,
        tags: projectDto.tags,
      },
    });

    return project;
  } catch (error) {
    console.error(error);
  }
};

export const getTasks: QueryFunction<
  PaginatedResponse<Task>,
  [string],
  number
> = async ({ pageParam, queryKey }) => {
  const totalCount = await prisma.task.count();
  const limit = 10;

  const data = await prisma.task.findMany({
    skip: (pageParam - 1) * limit,
    take: limit,
  });
  return {
    data: data,
    message: "Tasks fetched successfully",
    pagination: {
      totalProducts: totalCount,
      currentPage: pageParam,
      pageSize: data.length,
      totalPages: Math.ceil(totalCount / data.length),
    },
  };
};
