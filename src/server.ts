import { env } from "@Config/env";
import { fastifyAutoload } from "@fastify/autoload";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
export const server = fastify({ logger: false });
server.listen({
  port: env.PORT,
  host: env.HOST,
}, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening at ${address}`);
  console.log('Server is running 🔥 in', env.NODE_ENV);
  console.table(env);
});
/// swagger register, cors register

server.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
});

server.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Loja PET Backend API',
      description: 'Documentação da API do Mini CRM',
      version: '0.0.1',
    },

  },
});

server.register(fastifySwaggerUi, {
  prefix: '/docs',
});


server.register(fastifyAutoload, {
  dir: __dirname + '/routes',
  dirNameRoutePrefix: false,
});