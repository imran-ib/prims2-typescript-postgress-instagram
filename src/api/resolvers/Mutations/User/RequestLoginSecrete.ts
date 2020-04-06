import { Mails } from "./../../../../Utills/Mails/SendMail";
import { SecretGenerator } from "./../../../../Utills/RandomWords/GenerateRandomWord";
import { Context } from "./../../../../types/Context";
import { MutationRequestLoginSecretArgs } from "./../../../../types/graph.d";
import { prisma } from "../../../Primsa/Prisma";

export const requestLoginSecret = async (
  _parent: any,
  args: MutationRequestLoginSecretArgs,
  ctx: Context,
  _info: any
): Promise<string> => {
  try {
    const Exists = await prisma.user.findOne({ where: { email: args.email } });
    if (!Exists) throw new Error(`No User Found With Provided Email`);
    const Secret = SecretGenerator();
    const UpdatedUser = await prisma.user.update({
      where: { email: args.email },
      data: { loginSecret: Secret }
    });

    Mails.LoginSecreteMail(UpdatedUser, ctx, Secret);
    return `A Secret Has Been Generated and sent to ${args.email}`;
  } catch (error) {
    throw new Error(`Unable To Create Key ${error.message}`);
  }
};
