import { prisma } from "./../../../Primsa/Prisma";
import { Post, User, File } from "@prisma/client";
import { MutationEditPostArgs } from "./../../../../types/graph.d";
import AuthResolver from "../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../types/Context";

export const editPost = AuthResolver(
  async (
    __: any,
    args: MutationEditPostArgs,
    ctx: Context,
    _: any
  ): Promise<Post | null> => {
    try {
      const user: User = ctx.request.user;
      const POST = await prisma.post.findOne({ where: { id: args.postId } });
      const FILES: File[] = await prisma.file.findMany({
        where: { postId: args.postId }
      });
      if (!POST) throw new Error(`Post Not Found`);
      if (POST.authorId !== user.id)
        throw new Error(`You cannot Edit This Post`);
      const EditedPost = await prisma.post.update({
        where: { id: args.postId },
        data: {
          caption: args.caption,
          location: args.location
        }
      });

      args.files &&
        args.files.forEach(async (file, i) => {
          await prisma.file.update({
            where: {
              id: FILES[i].id
            },
            data: {
              file: file
            }
          });
        });
      return EditedPost;
    } catch (error) {
      throw new Error(`Unable To Edit Post ${error.message}`);
    }
  }
);
