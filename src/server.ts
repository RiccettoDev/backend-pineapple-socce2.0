import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'
import { createUser } from './routes/create-user'
import { listUsers } from './routes/list-user'
import { getUserById } from './routes/get-user-by-id'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createUser)
app.register(listUsers)
app.register(getUserById)

app.listen({ port: 3333 }).then(() => {
  console.log("Runing API PineappleSoccer!");
})