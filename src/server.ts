import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod';

import cors from '@fastify/cors'; // Caminho de importação correto com verificação de tipo

import { createUser } from './routes/create-user';
import { listUsers } from './routes/list-user';
import { getUserById } from './routes/get-user-by-id';
import { updateUser } from './routes/update-user';

const app = fastify({ logger: true });

const start = async () => {
  try {
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    // Registre o plugin CORS com opções
    await app.register(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'] // Adicione métodos permitidos se necessário
    });

    await app.register(createUser);
    await app.register(listUsers);
    await app.register(getUserById);
    await app.register(updateUser)

    await app.listen({ port: 3333, host: '91.108.126.64' }).then(() => {
      console.log("Runing API PineappleSoccer!");
    });
  } catch (error) {
    process.exit(1);
  }
};

start();