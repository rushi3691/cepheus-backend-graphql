import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    hello: () => "hi"
  }
};

export default resolvers;