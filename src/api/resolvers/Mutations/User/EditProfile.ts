import { GraphQLResolveInfo } from "graphql";
import {
  ResolversParentTypes,
  MutationEditProfileArgs,
  User
} from "./../../../../types/graph.d";
import AuthResolver from "../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../types/Context";
import { prisma } from "../../../Primsa/Prisma";

export const editProfile = AuthResolver(
  async (
    parent: ResolversParentTypes,
    args: MutationEditProfileArgs,
    ctx: Context,
    info: any
  ): Promise<User> => {
    try {
      const { user } = ctx.request;
      return await prisma.user.update({
        where: { id: user.id },
        data: {
          ...args
        }
      });
    } catch (error) {
      throw new Error(`Unable To Edit Profile ${error.message}`);
    }
  }
);
