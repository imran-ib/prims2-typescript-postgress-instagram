import { GenUserToke } from "./../../../../Utills/JWT/GenerateJwt";
import { Context } from "./../../../../types/Context";
import { MutationConfirmSecretLoginArgs } from "./../../../../types/graph.d";
import { prisma } from "../../../Primsa/Prisma";

export const confirmSecretLogin = async (
  _parent: any,
  args: MutationConfirmSecretLoginArgs,
  ctx: Context,
  _info: any
): Promise<string> => {
  try {
    const User = await prisma.user.findOne({ where: { email: args.email } });
    if (!User) throw new Error(`No User Found`);
    if (User.loginSecret !== args.key) throw new Error(`Invalid Key`);
    const Token: string = GenUserToke(User.id);
    await prisma.user.update({
      where: { email: args.email },
      data: { loginSecret: null }
    });
    return Token;
  } catch (error) {
    throw new Error(`Unable Verify Key ${error.message}`);
  }
};
