import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod';

// @ts-ignore
import cors from 'fastify/cors'; // Importe o módulo fastify-cors sem especificar tipos

import { createUser } from './routes/create-user';
import { listUsers } from './routes/list-user';
import { getUserById } from './routes/get-user-by-id';

const app = fastify({ logger: true });

const start = async () => {
  try {
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    // Registre o plugin de CORS sem especificar tipos
    await app.register(cors, {
      origin: 'https://frontend-pineapple-soccer2-0.vercel.app', // Adicione o domínio da Vercel às origens permitidas
      methods: ['GET', 'POST', 'PUT', 'DELETE'] // Adicione os métodos HTTP permitidos, se necessário
    });

    await app.register(createUser);
    await app.register(listUsers);
    await app.register(getUserById);

    await app.listen({ port: 3333 }).then(() => {
      console.log("Runing API PineappleSoccer!");
    });
  } catch (error) {
    process.exit(1);
  }
};

start();
