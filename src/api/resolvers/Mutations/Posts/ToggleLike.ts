import { MutationToggleLikeArgs } from "./../../../../types/graph.d";
import AuthResolver from "../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../types/Context";
import { User, Like } from "@prisma/client";
import { prisma } from "../../../Primsa/Prisma";

export const toggleLike = AuthResolver(
  async (
    __: any,
    args: MutationToggleLikeArgs,
    ctx: Context,
    _: any
  ): Promise<string> => {
    try {
      const user: User = ctx.request.user;

      const [Exists]: Like[] = await prisma.like.findMany({
        where: {
          AND: [{ userId: user.id }, { postId: args.postId }]
        }
      });
      if (Exists) {
        await prisma.like.delete({
          where: {
            id: Exists.id
          }
        });
      } else {
        await prisma.like.create({
          data: {
            post: { connect: { id: args.postId } },
            user: { connect: { id: user.id } }
          }
        });
      }

      return "Success";
    } catch (error) {
      throw new Error(`Unable To Complete The Action ${error.message}`);
    }
  }
);
