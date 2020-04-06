import { MutationFollowUnfollowArgs, User } from "../../../../../types/graph";
import AuthResolver from "../../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../../types/Context";
import { prisma } from "../../../../Primsa/Prisma";

export const followUnfollow = AuthResolver(
  async (
    parent: any,
    args: MutationFollowUnfollowArgs,
    ctx: Context,
    info: any
  ): Promise<User> => {
    try {
      const user: User = ctx.request.user;

      if (user.id === args.id) throw new Error(`You Cannot Follow Yourself`);

      const [Exists] = await prisma.user.findMany({
        select: { following: true },
        where: {
          AND: [{ id: user.id }, { following: { some: { id: args.id } } }]
        }
      });

      let USER;
      if (Exists) {
        USER = await prisma.user.update({
          where: { id: user.id },
          include: { following: true, followedBy: true },
          data: { following: { disconnect: { id: args.id } } }
        });
      } else {
        USER = await prisma.user.update({
          where: { id: user.id },
          include: { following: true, followedBy: true },
          data: {
            following: { connect: { id: args.id } }
          }
        });
      }
      return USER;
    } catch (error) {
      throw new Error(`Unable To Complete The Action ${error.message}`);
    }
  }
);
