import {
  QueryUserSearchArgs,
  QuerySearchPostArgs
} from "../../../../types/graph";
import AuthResolver from "../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../types/Context";
import { Post, User } from "@prisma/client";
import { prisma } from "../../../Primsa/Prisma";
import { capitalizeFirstLetter } from "../../../../Utills/FirstLetterUpperCase";

export const userSearch = AuthResolver(
  async (
    __: any,
    args: QueryUserSearchArgs,
    ctx: Context,
    _: any
  ): Promise<User[]> => {
    try {
      let Term: string = args.term.toLowerCase();
      const UpperCaseTerm: string = Term.toUpperCase();
      const FirstLetterUpper: string = capitalizeFirstLetter(Term);

      const Users: User[] = await prisma.user.findMany({
        where: {
          OR: [
            {
              firstName: { contains: FirstLetterUpper } || {
                  contains: UpperCaseTerm
                } || { contains: Term }
            },
            {
              email: { contains: FirstLetterUpper } || {
                  contains: UpperCaseTerm
                } || { contains: Term }
            },
            {
              lastName: { contains: FirstLetterUpper } || {
                  contains: UpperCaseTerm
                } || { contains: Term }
            },
            {
              fullName: { contains: FirstLetterUpper } || {
                  contains: UpperCaseTerm
                } || { contains: Term }
            }
          ]
        }
      });
      return Users;
    } catch (error) {
      throw new Error(`Unable To Complete Search ${error.message}`);
    }
  }
);
export const searchPost = AuthResolver(
  async (
    __: any,
    args: QuerySearchPostArgs,
    ctx: Context,
    _: any
  ): Promise<Post[]> => {
    try {
      let Term: string = args.term.toLowerCase();
      const UpperCaseTerm: string = Term.toUpperCase();
      const FirstLetterUpper: string = capitalizeFirstLetter(Term);

      const Posts: Post[] = await prisma.post.findMany({
        where: {
          OR: [
            {
              caption: { contains: FirstLetterUpper } || {
                  contains: UpperCaseTerm
                } || { contains: Term }
            },
            {
              location: { contains: FirstLetterUpper } || {
                  contains: UpperCaseTerm
                } || { contains: Term }
            }
          ]
        }
      });
      return Posts;
    } catch (error) {
      throw new Error(`Unable To Complete Search ${error.message}`);
    }
  }
);
