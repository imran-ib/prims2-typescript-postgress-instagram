import { prisma } from "./../../../Primsa/Prisma";
import { QueryRoomArgs } from "./../../../../types/graph.d";
import AuthResolver from "../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../types/Context";
import { Room, User } from "@prisma/client";

export const room = AuthResolver(
  async (__: any, args: QueryRoomArgs, ctx: Context, _: any): Promise<Room> => {
    try {
      const user: User = ctx.request.user;

      const Room: Room[] = await prisma.room.findMany({
        include: { participants: true, messeges: true },
        where: {
          participants: {
            some: {
              AND: [{ id: user.id }, { rooms: { some: { id: args.id } } }],
            },
          },
        },
      });
      if (!Room) throw new Error(`Room Not Found`);
      const [CurrentRoom] = Room.filter((room) => room.id === args.id);
      if (!CurrentRoom) throw new Error(`Room Not Found`);
      return CurrentRoom;
    } catch (error) {
      throw new Error(`Unable To Get The Room ${error.message}`);
    }
  }
);
