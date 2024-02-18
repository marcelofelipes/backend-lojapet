import { FastifyInstance, RouteOptions } from 'fastify';

export default (app: FastifyInstance, opts: RouteOptions, done: () => void) => {
  app.get('/ping', {
    schema: {
      tags: ['Test'],
      description: 'Test ping',
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            timestamp: { type: 'number' }, // Adicionando a propriedade timestamp
            agent: { type: 'string' } // Adicionando a propriedade agent
          },
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const timestamp = Date.now(); // Obtendo o timestamp atual em milissegundos
        const userAgent = request.headers['user-agent']; // Obtendo o cabeçalho 'User-Agent'

        reply.send({
          message: 'pong',
          timestamp: timestamp, // Incluindo o timestamp na resposta
          agent: userAgent // Incluindo o cabeçalho 'User-Agent' na resposta
        });
        console.log('Example route logic completed');
      } catch (error) {
        console.error('Error:', error);
        reply.status(500).send({ error: 'Internal Server Error' });
      }
    }
  });
  done();
}
