import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function updateUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .put('/users/:id', {
      schema: {
        params: z.object({
          id: z.string().uuid() // Certifique-se de que o id seja um UUID
        }),
        body: z.object({
          name: z.string().min(4),
          surname: z.string().min(2),
          email: z.string().email(),
          password: z.string(),
          stars: z.string().nullable(),
          position: z.string(),
          force: z.string().nullable(),
          attack: z.string().nullable(),
          defense: z.string().nullable(),
          goals: z.string().nullable(),
          assistance: z.string().nullable(),
          status: z.string().nullable(),
          img: z.string().nullable()
        }),
        response: {
          200: z.object({
            userId: z.string().uuid()
          }),
          404: z.object({
            message: z.string()
          }),
          500: z.object({
            message: z.string()
          })
        },
      },
    }, async (request, reply) => {
      const userId = request.params.id; // Obtenha o id do usuário dos parâmetros da URL
      const userData = request.body;

      try {
        // Verifique se o usuário existe
        const existingUser = await prisma.user.findUnique({
          where: { id: userId }
        });

        if (!existingUser) {
          return reply.status(404).send({ message: "User not found" });
        }

        // Atualize o usuário com os novos dados
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            password: userData.password,
            stars: userData.stars || '',
            position: userData.position,
            force: userData.force || "",
            attack: userData.attack || "",
            defense: userData.defense || "",
            goals: userData.goals || "",
            assistance: userData.assistance || "",
            status: userData.status || "",
            img: userData.img || ""
          }
        });

        return reply.status(200).send({ userId: updatedUser.id });
      } catch (error) {
        console.error("Error updating user:", error);
        return reply.status(500).send({ message: "Internal Server Error" });
      }
    });
}
