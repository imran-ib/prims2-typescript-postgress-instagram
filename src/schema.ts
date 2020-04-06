// import { GraphQLSchema } from "graphql";
// import { makeExecutableSchema } from "graphql-tools";
// import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
// import path from "path";

// //  Get all Files with .graphql extension

// const allTypes: GraphQLSchema[] = fileLoader(
//   path.join(__dirname, "./api/**/*.graphql")
// );
// // get all files ending with .resolvers.anything

// const allResolvers = fileLoader(path.join(__dirname, "./api/**/*.resolvers.*"));
// // Merge them
// const mergedTypes = mergeTypes(allTypes);
// const mergedResolvers = mergeResolvers(allResolvers);

// // Make Schema and export
// export const schema = makeExecutableSchema({
//   typeDefs: mergedTypes,
//   resolvers: mergedResolvers
// });

// //! this schema is not being used in this app. typeRefs and resolvers are being droectly passed to server.

// export default schema;
