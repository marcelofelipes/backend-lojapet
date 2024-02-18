import { db } from "@database/db"; // Caminho relativo ao diretório atual
import { ErrorREST, ErrorsAPI } from "@errors/error"; // Caminho relativo ao diretório atual
import { FastifyReply, FastifyRequest } from 'fastify';
export async function authapi(request: FastifyRequest, reply: FastifyReply) {
  try {
    const apiKey = request.headers['x-api-key'];
    if (!apiKey) {
      throw new ErrorREST(ErrorsAPI.Missing); // Usando Errors.BadRequest
    }
    const verifyKey = await db.apiKey.findUnique({
      where: {
        key: apiKey as string,
        expired: false as boolean,
        enabled: true as boolean,
      },
    });
    if (!verifyKey) {
      throw new ErrorREST(ErrorsAPI.Unauthorized) // Ajustado para lançar Error
    }
  } catch (error: any) {
    if (error instanceof ErrorREST) {
      reply.status(error.response.status).send({
        message: error.response.message, detail: error.response.detail,
        agent: request.headers['user-agent'],
        date: request.headers['date']
      });
    } else {
      reply.status(500).send({ message: 'Internal Server Error' });
    }
  }
}
