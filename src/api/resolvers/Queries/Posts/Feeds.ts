import { prisma } from "./../../../Primsa/Prisma";
import { User, Post } from "@prisma/client";
import AuthResolver from "../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../types/Context";

export const feeds = AuthResolver(
  async (__: any, args: any, ctx: Context, _: any): Promise<Post[]> => {
    try {
      const user: User = ctx.request.user;

      const Following = await prisma.user
        .findOne({
          where: {
            id: user.id,
          },
        })
        .following();

      const ids = Following.map((id) => id.id);

      const POST: Post[] = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          authorId: { in: [...ids, user.id] },
        },
      });

      return POST;
    } catch (error) {
      throw new Error(`Unable to fetch your feeds ${error.message}`);
    }
  }
);
