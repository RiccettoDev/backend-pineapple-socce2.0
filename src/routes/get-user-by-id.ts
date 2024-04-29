import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getUserById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/users/:id', {
    schema: {
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        200: z.object({
          id: z.string().uuid(),
          name: z.string(),
          surname: z.string(),
          email: z.string(),
          password: z.string(),
          stars: z.string(),
          position: z.string(),
          force: z.string(),
          attack: z.string(),
          defense: z.string(),
          goals: z.string(),
          assistance: z.string(),
          status: z.string(),
          img: z.string()
        }),
        404: z.object({
          message: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const { id } = request.params;

    try {
      const user = await prisma.user.findUnique({
        where: { id }
      });

      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }

      return reply.send(user); // Retorna os dados do usuário diretamente
    } catch (error) {
      console.error("Error fetching user:", error);
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  });
}
