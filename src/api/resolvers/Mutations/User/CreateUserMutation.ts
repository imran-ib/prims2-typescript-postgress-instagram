import { Context } from "graphql-yoga/dist/types";
import validateEmail from "../../../../Utills/Mails/ValidateEmail";
import { User, MutationCreateUserArgs } from "../../../../types/graph";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (
  _parent: any,
  args: MutationCreateUserArgs,
  ctx: Context,
  _info: any
) => {
  try {
    let email: string = args.email;
    if (!email) throw new Error(`You Must Provide Email Address`);
    email = args.email.toLowerCase();
    const ValidEmail: Boolean = validateEmail(email);
    if (!ValidEmail) throw new Error(`The Email Address ${email} is Not Valid`);
    const Exists: User | null = await prisma.user.findOne({
      where: { email: email }
    });
    if (Exists) throw new Error(`User Already Exists`);

    return await prisma.user.create({
      data: {
        avatar: args.avatar,
        username: args.username,
        firstName: args.firstName,
        lastName: args.lastName,
        email: email,
        fullName:
          args.firstName && args.lastName
            ? args.firstName + " " + args.lastName
            : args.firstName || args.lastName,
        bio: args.bio ? args.bio : ""
      }
    });
  } catch (error) {
    throw new Error(`Unable To Create User Because ${error.message}`);
  }
};
