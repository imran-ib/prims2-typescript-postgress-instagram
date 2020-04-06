import { MutationCreatePostArgs } from "./../../../../types/graph.d";
import AuthResolver from "../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../types/Context";
import { Post, User } from "@prisma/client";
import { prisma } from "../../../Primsa/Prisma";

export const createPost = AuthResolver(
  async (
    __: any,
    args: MutationCreatePostArgs,
    ctx: Context,
    _: any
  ): Promise<Post | null> => {
    try {
      const user: User = ctx.request.user;

      const Post: Post = await prisma.post.create({
        include: { likes: true },
        data: {
          caption: args.caption,
          location: args.location,
          author: { connect: { id: user.id } }
        }
      });

      args.files.forEach(async file => {
        await prisma.file.create({
          data: {
            file: file,
            post: { connect: { id: Post.id } }
          }
        });
      });

      return Post;
    } catch (error) {
      throw new Error(`Unable To Create Post ${error.message}`);
    }
  }
);
