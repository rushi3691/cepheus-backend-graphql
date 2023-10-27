import { Resolvers } from "../../types";
import { Prisma } from "@prisma/client";

const resolvers: Resolvers = {
  Mutation: {
    createTeam: async (_, { event_id, team_name }, { prisma, ini, id, registered }) => {
      try {
        if (!id) {
          throw new Error("User not logged in");
        }
        if(!registered) {
          throw new Error("User not registered");
        }
        const team = await prisma.$transaction(async (prisma) => {
          const event = await prisma.event.findUnique({
            where: {
              id: event_id,
            },
          });
          if (!event || !event.active) throw new Error("Event not found");

          // const team = await prisma.team.findUnique({
          //   where: {
          //     team_name,
          //     event_id,
          //   },
          // });
          // if (team) throw new Error("Team name already exists");

          const teamInsert = await prisma.team.create({
            data: {
              team_name,
              event_id,
            },
          });

          const teamId = teamInsert.id;
          const team_code = `CP${teamId}${ini}`;

          const teamUpdate = await prisma.team.update({
            where: {
              id: teamId,
            },
            data: {
              team_code,
            },
          });

          return teamUpdate;
        });
        return {
          code: 200,
          success: true,
          message: "Team created successfully",
          team,
        };
      } catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            return {
              code: 500,
              success: false,
              message: `Team with ${err.meta?.target} already exists`,
              team: null,
            };
          }
        }
        return {
          code: 500,
          success: false,
          message: err.message,
          team: null,
        };
      }
    },
  },
};

export default resolvers;
