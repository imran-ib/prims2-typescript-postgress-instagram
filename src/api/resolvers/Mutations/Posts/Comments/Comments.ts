import {
  MutationCreateCommentArgs,
  MutationEditCommentArgs,
  MutationDeleteCommentArgs
} from "./../../../../../types/graph.d";
import AuthResolver from "../../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../../types/Context";
import { Comment, User } from "@prisma/client";
import { prisma } from "../../../../Primsa/Prisma";

export const createComment = AuthResolver(
  async (
    __parent: any,
    args: MutationCreateCommentArgs,
    ctx: Context,
    _: any
  ): Promise<Comment> => {
    try {
      const user: User = ctx.request.user;
      const Comment: Comment = await prisma.comment.create({
        data: {
          author: { connect: { id: user.id } },
          post: { connect: { id: args.postId } },
          text: args.text
        }
      });
      return Comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const editComment = AuthResolver(
  async (
    __parent: any,
    args: MutationEditCommentArgs,
    ctx: Context,
    _: any
  ): Promise<Comment> => {
    try {
      const user: User = ctx.request.user;
      const Comment = await prisma.comment.update({
        where: { id: args.commentId },
        data: { text: args.text }
      });
      return Comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteComment = AuthResolver(
  async (
    __parent: any,
    args: MutationDeleteCommentArgs,
    ctx: Context,
    _: any
  ): Promise<string> => {
    try {
      const user: User = ctx.request.user;

      await prisma.comment.deleteMany({
        where: {
          AND: [{ id: args.commentId }, { authorId: user.id }]
        }
      });
      return `Success`;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
