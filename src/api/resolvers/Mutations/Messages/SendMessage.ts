import { MESSAGE_CHANNEL } from "./../../../../Utills/CONSTANTS";
import { prisma } from "./../../../Primsa/Prisma";
import {
  MutationSendMessegeArgs,
  Message,
  Room,
} from "./../../../../types/graph.d";
import AuthResolver from "../../../../Utills/Auth/AuthResolver";
import { Context } from "../../../../types/Context";
import { User } from "@prisma/client";

//SECTION 1 if there is no Room We Will Create a Room
//SECTION 2 if there is already a room we will find that room
//SECTION 3 Get the participants ids and filter out user id
//SECTION 4 Create new Message and connect it to Room, sender(user), receiver(args.userId or any one from participants except user)

// REVIEW BIG FUCKING REVIEW

export const sendMessege = AuthResolver(
  async (
    __: any,
    args: MutationSendMessegeArgs,
    ctx: Context,
    info: any
  ): Promise<Message> => {
    try {
      const user: User = ctx.request.user;
      if (args.toId === user.id) throw new Error(`You Are not Allowed`);

      let chatRoom: Room | null;
      /*
      const UserRoom = await prisma.user
        .findOne({ where: { id: user.id } })
        .rooms();
      console.log("UserRoom", UserRoom);

*/
      //TODO if user has no room create one
      //TODO Get rooms Ids
      //TODO find the one with args.roomId
      //TODO send message in that room

      if (!args.roomId) {
        chatRoom = await prisma.room.create({
          include: { participants: true },
          data: {
            participants: {
              connect: [{ id: user.id }, { id: args.toId }],
            },
          },
        });
      } else {
        chatRoom = await prisma.room.findOne({
          include: { participants: true },
          where: {
            id: args.roomId,
          },
        });
      }
      if (!chatRoom) throw Error(`Room Not Found`);

      const GetId =
        chatRoom.participants &&
        chatRoom.participants.filter(
          (participants) => participants && participants.id !== user.id
        )[0];

      const NewMessage: any = await prisma.message
        .create({
          data: {
            text: args.text,
            sender: {
              connect: {
                id: user.id,
              },
            },
            receiver: {
              connect: {
                //NOTE args.toId is used only first time To Create Room And Add (user) and (args.toId Users) to participants
                //NOTE if we have room then we are sending messages to participants not to args.toId
                //NOTE One Room can have more then two participant
                id: args.roomId ? GetId && GetId.id : args.toId,
              },
            },

            room: {
              connect: {
                id: chatRoom.id,
              },
            },
          },
        })

        .catch((error) => console.log(`NewMessage ${error.message}`));

      NewMessage.ROOMID = chatRoom.id;

      ctx.pubsub.publish(MESSAGE_CHANNEL, { newMessage: NewMessage });

      return NewMessage;
    } catch (error) {
      throw Error(`Some went Wrong ${error.message}`);
    }
  }
);
