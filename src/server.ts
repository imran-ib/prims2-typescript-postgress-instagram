import { GraphQLServer, PubSub } from "graphql-yoga";
import { Query } from "./api/resolvers/Query";
import { Mutation } from "./api/resolvers/Mutations";
import { Subscription } from "./api/resolvers/Subscriptions";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const pubsub = new PubSub();

function CreateServer() {
  const server = new GraphQLServer({
    typeDefs: __dirname + "/api/schema.graphql",
    //@ts-ignore
    resolvers: {
      Query,
      Mutation,
      Subscription,
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: (req) => {
      const { connection: { context = null } = {} } = req;
      return {
        ...req,
        prisma,
        context,
        pubsub,
      };
    },
  });
  return server;
}

export default CreateServer;
