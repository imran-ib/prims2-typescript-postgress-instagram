import { MutationDeleteUserArgs } from "../../../../types/graph";
import AuthResolver from "../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../types/Context";
import { User } from "@prisma/client";
import { prisma } from "../../../Primsa/Prisma";

export const deleteUser = AuthResolver(
  async (
    __: any,
    args: MutationDeleteUserArgs,
    ctx: Context,
    _: any
  ): Promise<string> => {
    try {
      const user: User = ctx.request.user;
      // if args.id is not equal to user id throw error
      if (user.id !== args.id)
        throw new Error(`You Connot Perform this Action`);

      // REVIEW this action is very expensive on database but cascade delete is not supported yet
      // REVIEW Another Feature is comming to prisma 2 for Bulk operations (prisma.transaction)
      await prisma.file.deleteMany({ where: { post: { authorId: user.id } } });
      await prisma.like.deleteMany({ where: { userId: user.id } });
      await prisma.comment.deleteMany({ where: { authorId: user.id } });
      await prisma.post.deleteMany({ where: { authorId: user.id } });
      await prisma.room.deleteMany({
        where: { participants: { some: { id: user.id } } }
      });
      await prisma.message.deleteMany({ where: { senderId: user.id } });

      await prisma.user.delete({ where: { id: args.id } });

      return `User Has Been Removed`;
    } catch (error) {
      throw new Error(`Unable To Complete The Action ${error.message}`);
    }
  }
);
