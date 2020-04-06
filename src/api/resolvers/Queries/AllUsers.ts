import { Context } from "./../../../types/Context";
import { forwardTo } from "prisma-binding";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const users = (_parent: any, args: any, ctx: Context, info: any) => {
  // return prisma.user.deleteMany({});
  return prisma.user.findMany({});
};
