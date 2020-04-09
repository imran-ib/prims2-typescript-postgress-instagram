import { prisma } from "./../../../Primsa/Prisma";
import { Room } from "./../../../../types/graph.d";
import AuthResolver from "../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../types/Context";
import { User } from "@prisma/client";

export const rooms = AuthResolver(
  async (__: any, args: any, ctx: Context, _: any): Promise<Room[]> => {
    try {
      const user: User = ctx.request.user;

      return prisma.room.findMany({
        include: { participants: true, messeges: true },
        where: {
          participants: {
            some: { id: user.id },
          },
        },
      });
    } catch (error) {
      throw new Error(`Some went Wrong ${error.message}`);
    }
  }
);
