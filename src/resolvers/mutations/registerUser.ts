import { generateJwt } from "../../auth/jwt";
import { Resolvers } from "../../types";
import { Prisma } from "@prisma/client";

const resolvers: Resolvers = {
  Mutation: {
    registerUser: async (_, args, { prisma, id }) => {
      try {
        if (!id) throw new Error("User not authenticated");
        const { user_name, college, grade, mobile, image_url } = args;
        const registered = true;
        const user = await prisma.user.update({
          where: { id },
          data: {
            user_name,
            college,
            grade,
            mobile,
            image_url,
            registered,
          },
        });
        const token = generateJwt({
          id: user.id,
          user_name: user.user_name,
          registered: user.registered,
        });

        return {
          code: 200,
          success: true,
          message: "User updated successfully",
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
