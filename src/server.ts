import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'

// Importe o módulo fastify-cors sem especificar tipos
// @ts-ignore
import cors from 'fastify-cors'

import { createUser } from './routes/create-user'
import { listUsers } from './routes/list-user'
import { getUserById } from './routes/get-user-by-id'

const app = fastify({ logger: true })

const start = async () => {
  try {
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    // Registre o plugin de CORS sem especificar tipos
    await app.register(cors)

    await app.register(createUser)
    await app.register(listUsers)
    await app.register(getUserById)

    await app.listen({ port: 3333 }).then(() => {
      console.log("Runing API PineappleSoccer!");
    })
  } catch (error) {
    process.exit(1)
  }
}

start()
