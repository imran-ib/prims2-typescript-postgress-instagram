import { Context } from "./../../../../types/Context";
export const DriversSubscriptions = {
  subscribe: async (_parent: any, _args: any, ctx: Context, info: any) => {
    const { currentUser } = ctx.context;
    const { lastLat, lastLng } = currentUser;
    const userIterator = await ctx.prisma.subscription.user(
      {
        where: {
          AND: [
            {
              updatedFields_contains_some: [
                "lastLat",
                "lastLng",
                "lastOrientation"
              ]
            },
            {
              node: {
                AND: [
                  { isDriving: true },
                  { lastLat_gte: lastLat - 0.5 },
                  { lastLat_lte: lastLat + 0.5 },
                  { lastLng_gte: lastLng - 0.5 },
                  { lastLng_lte: lastLng + 0.5 }
                ]
              }
            }
          ]
        }
      },
      info
    );
    return userIterator;
  }
};
