import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./resolvers";
import { DBContext, prisma } from "./context";
import { checkJwt } from "./auth/jwt";

async function startApolloServer() {
  const server = new ApolloServer<DBContext>({
    typeDefs,
    resolvers
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const auth = req.headers.authorization;
      if (auth && auth != "") {
        try {
          const { id, ini, registered } = await checkJwt(auth);
          return {
            prisma,
            id,
            ini,
            registered,
          };
        } catch (err) {}
      }
      return { prisma };
    },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
