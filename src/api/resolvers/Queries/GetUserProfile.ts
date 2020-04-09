import { QueryGetUserProfileArgs, User } from "./../../../types/graph.d";
import AuthResolver from "../../../Utills/Auth/AuthResolver";
import { prisma } from "../../Primsa/Prisma";
import { Context } from "../../../types/Context";

export const getUserProfile = AuthResolver(
  async (
    _parent: any,
    args: QueryGetUserProfileArgs,
    ctx: Context,
    _info: any
  ): Promise<User | any> => {
    try {
      const { user } = ctx.request;

      const User: User | null = await prisma.user.findOne({
        include: { following: true, followedBy: true },
        where: { id: args.id },
      });
      if (!User) throw new Error(`User Not Found`);
      return User;
    } catch (error) {
      throw new Error(`Unable To Get User Profile ${error.message}`);
    }
  }
);
