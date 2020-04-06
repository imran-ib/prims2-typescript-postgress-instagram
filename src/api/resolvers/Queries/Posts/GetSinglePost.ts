import { QueryPostArgs } from "./../../../../types/graph.d";
import AuthResolver from "../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../types/Context";
import { User, Post } from "@prisma/client";
import { prisma } from "../../../Primsa/Prisma";

export const post = AuthResolver(
  async (
    __: any,
    args: QueryPostArgs,
    ctx: Context,
    _: any
  ): Promise<Post | null> => {
    try {
      const user: User = ctx.request.user;
      const Post: Post | null = await prisma.post.findOne({
        include: { files: true, comments: true, author: true, likes: true },
        where: { id: args.id }
      });

      return Post;
    } catch (error) {
      throw new Error(`Unable To Get Post ${error.message}`);
    }
  }
);
