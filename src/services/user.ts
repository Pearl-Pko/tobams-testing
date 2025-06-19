"use server"
import "server-only"
import { prisma } from "@/prisma";
import { getSession } from "./auth"

export const getUser = async () => {
    const session = await getSession();
    if (!session) {
        throw new Error("User not authenticated");
    }
    const userId = session.userId;

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    return user;
}