import { GraphQLServer } from "graphql-yoga";
import { Query } from "./api/resolvers/Query";
import { Mutation } from "./api/resolvers/Mutations";
import { Subscription } from "./api/resolvers/Subscriptions";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function CreateServer() {
  const server = new GraphQLServer({
    typeDefs: __dirname + "/api/schema.graphql",
    //@ts-ignore
    resolvers: {
      Query,
      Mutation,
      Subscription
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => {
      const { connection: { context = null } = {} } = req;
      return {
        ...req,
        prisma,
        context
      };
    }
  });
  return server;
}

export default CreateServer;
