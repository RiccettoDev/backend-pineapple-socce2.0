import fastify from 'fastify'
import { z } from 'zod'
import { PrismaClient } from "@prisma/client";

const app = fastify()

const prisma = new PrismaClient({
  log: ['query'],
})
// Isto faz com que cada query que for feita ao banco de dados, será feito um log para visualização.

app.post('/users', async (request, reply) => {
  const createUser = z.object({
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
  })
  // assim definimos o que deve ter no corpo da requisição de createUser

  const data = createUser.parse(request.body)
  // o .parse faz a validação dos dados validadndo o request.body
  // assim ele pega o corpo da requisição e verifica se segue a estrutura definida em createUser.  

  const user = await prisma.user.create({
    data: {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      stars: data.stars || '',
      position: data.position,
      force: data.force || '',
      attack: data.attack || '',
      defense: data.defense || '',
      goals: data.goals || '',
      assistance: data.assistance || '',
      status: data.status || '',
      img: data.img || ''
      // itemExemplo: data.itemExemplo || '',  Se data.itemExemplo for nulo, atribui uma string vazia
    }
  })

  return reply.status(201).send({ userId: user.id })
  // Aqui renornamos o reply com status 201 informando que a criação do user foi feita com sucesso e retornando o id do user.
})

app.listen({ port: 3333 }).then(() => {
  console.log("Runing API PineappleSoccer!");
})