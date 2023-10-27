import { commonAuth } from "../../auth/verifier/common-auth-test";
import { generateJwt } from "../../auth/jwt";
import { Resolvers } from "../../types";
import { Prisma } from "@prisma/client";
import { LoginVerifier } from "../../auth/verifier";

const resolvers: Resolvers = {
  Mutation: {
    loginUser: async (_, { idToken }, { prisma }) => {
      try {
        const { user_name, user_uuid, email } = await LoginVerifier(idToken);

        const user = await prisma.user.upsert({
          where: { user_uuid },
          update: { user_name, email },
          create: { user_name, email, user_uuid },
        });

        const token = generateJwt({
          id: user.id,
          user_name: user.user_name,
          registered: user.registered,
        });

        return {
          code: 200,
          success: true,
          message: "User Added Successfully",
          token,
          user,
        };
      } catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            return {
              code: 500,
              success: false,
              message: `User with ${err.meta?.target} already exists`,
              user: null,
              token: null,
            };
          }
        }
        return {
          code: 500,
          success: false,
          message: err.message,
          user: null,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
