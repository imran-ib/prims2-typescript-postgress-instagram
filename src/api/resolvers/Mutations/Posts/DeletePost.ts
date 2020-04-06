import { MutationDeletePostArgs } from "./../../../../types/graph.d";
import AuthResolver from "../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../types/Context";
import { prisma } from "../../../Primsa/Prisma";
import { User, Post } from "@prisma/client";

export const deletePost = AuthResolver(
  async (
    __: any,
    args: MutationDeletePostArgs,
    ctx: Context,
    _: any
  ): Promise<string> => {
    try {
      const user: User = ctx.request.user;

      const Post: Post | null = await prisma.post.findOne({
        where: { id: args.postId }
      });
      if (!Post) throw new Error(`Post not Found`);

      if (Post.authorId !== user.id)
        throw new Error(`You Don't Have Permission To Do That`);

      // REVIEW this action is expensive on database but cascade delete is not supported yet
      // REVIEW Another Feature is comming to prisma 2 for Bulk operations (prisma.transaction)
      await prisma.file.deleteMany({ where: { postId: args.postId } });
      await prisma.like.deleteMany({ where: { postId: args.postId } });
      await prisma.comment.deleteMany({ where: { postId: args.postId } });
      const DeletedPost = await prisma.post.delete({
        where: { id: args.postId }
      });
      console.log("DeletedPost", DeletedPost);

      return "Success";
    } catch (error) {
      throw new Error(`Unable to complete The Action ${error.message}`);
    }
  }
);
