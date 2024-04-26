import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/users', {
      schema: {
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
          201: z.object({
            userId: z.string().uuid()
          })
        },
      },
    }, async (request, reply) => {
      const {
        name,
        surname,
        email,
        password,
        stars,
        position,
        force,
        attack,
        defense,
        goals,
        assistance,
        status,
        img
      } = request.body

      const user = await prisma.user.create({
        data: {
          name,
          surname,
          email,
          password,
          stars: stars || '',
          position,
          force: force || "",
          attack: attack || "",
          defense: defense || "",
          goals: goals || "",
          assistance: assistance || "",
          status: status || "",
          img: img || ""
        }
      })
      return reply.status(201).send({ userId: user.id })
    })
}