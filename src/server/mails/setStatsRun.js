"use server";

import { auth } from "@/auth";
import { prisma } from "../db";

export const setStatsRun = async (status = false) => {
  const session = await auth();

  await prisma.Runs.create({
    data: {
      user: { connect: { id: session?.user?.id } },
      success: status,
    },
  });
};
