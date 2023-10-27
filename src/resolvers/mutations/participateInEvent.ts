import { UserModel } from "../../graphql/models";
import { Resolvers } from "../../types";
import { Prisma } from "@prisma/client";

const resolvers: Resolvers = {
  Mutation: {
    participateInEvent: async (_, { event_id, team_code }, { prisma, id, registered }) => {
      try {
        if (!id) {
          throw new Error("User not logged in");
        }
        if(!registered) {
          throw new Error("User not registered");
        }
        const event = await prisma.$transaction(async (prisma) => {
          const eventTeamMembers = await prisma.event.findUnique({
            where: { id: event_id },
            include: {
              teams: {
                where: { team_code },
                include: {
                  members: {
                    select: { id: true },
                  },
                },
              },
            },
          });

          if (!eventTeamMembers || !eventTeamMembers.active) {
            throw new Error("Event not found");
          }

          if (!eventTeamMembers?.teams.length) {
            throw new Error("Team not found");
          }

          const user = await prisma.user.findUnique({
            where: { id },
            select: { grade: true },
          });

          if (!user) {
            throw new Error("User not found");
          }

          if (
            user.grade &&
            (user.grade < eventTeamMembers.min_grade ||
              user.grade > eventTeamMembers.max_grade)
          ) {
            throw new Error("User grade not allowed");
          }

          if (
            eventTeamMembers.teams[0].members.length >=
            eventTeamMembers.max_mates
          ) {
            throw new Error("Team is full");
          }

          const userAlreadyInTeam = eventTeamMembers.teams[0].members.some(
            (member) => member.id === id
          );
          if (userAlreadyInTeam) {
            throw new Error("User already in team");
          }

          const eventTeam = await prisma.eventTeam.create({
            data: {
              event_id,
              team_id: eventTeamMembers.teams[0].id,
              user_id: id,
            },
          });

          return eventTeamMembers.id;
        });

        return {
          code: 200,
          message: "Team successfully joined",
          success: true,
        };
      } catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            return {
              code: 500,
              success: false,
              message: `User with ${err.meta?.target} already exists`,
            };
          }
        }
        return {
          code: 500,
          success: false,
          message: err.message,
        };
      }
    },
  },
};

export default resolvers;
