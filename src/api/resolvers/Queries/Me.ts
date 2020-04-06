import AuthResolver from "../../../Utills/Auth/AuthResolver";
import { Context } from "../../../types/Context";
import { User } from "../../../types/graph";
import { prisma } from "../../Primsa/Prisma";

export const me = AuthResolver(
  async (_: any, args: any, ctx: Context, __: any): Promise<User> => {
    try {
      const user: User = ctx.request.user;
      await prisma.user.findOne({
        include: {
          followedBy: true,
          following: true,
          likes: true
        },
        where: { id: user.id }
      });
      return user;
    } catch (error) {
      throw new Error(`No User Found ${error.message}`);
    }
  }
);
