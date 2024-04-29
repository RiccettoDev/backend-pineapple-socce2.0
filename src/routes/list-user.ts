import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function listUsers(app: FastifyInstance) {
  app.get('/users', async (request, reply) => {
    try {
      const users = await prisma.user.findMany();
      return reply.send({ users });
    } catch (error) {
      console.error("Error listing users:", error);
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  });
}
