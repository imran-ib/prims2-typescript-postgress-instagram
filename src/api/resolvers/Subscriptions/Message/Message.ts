import { MESSAGE_CHANNEL } from "./../../../../Utills/CONSTANTS";
import { Context } from "../../../../types/Context";
import { withFilter } from "graphql-yoga";

export const newMessage = {
  subscribe: withFilter(
    (_, ___, ctx: Context, __) => ctx.pubsub.asyncIterator(MESSAGE_CHANNEL),

    async (payload, variables) => {
      console.log("payload", payload.newMessage.ROOMID);
      return payload.newMessage.ROOMID === variables.RoomId;
    }
  ),
};

// Not Workign  ck8rv7cnf0002bgvhhcb50lqi
// ck8ruz2s50000zwvhauoo7kx3
