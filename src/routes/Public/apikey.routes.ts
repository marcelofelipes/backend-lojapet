import { ErrorREST } from "@errors/error";
import { ApiKeyCreate } from "@interfaces/apikey.interface";
import { authapi } from "@middlewares/authapi";
import { ApiKeyUseCase } from "@usecases/apikey.usecase";
import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from "fastify";
export default async function (app: FastifyInstance, opts: RouteOptions) {
  const apiKeyUseCase = new ApiKeyUseCase();

  app.post<{ Body: ApiKeyCreate }>('/apikey', async (req: FastifyRequest, res: FastifyReply) => {
    app.addHook('preHandler', authapi); // Add the authapi middleware to the route
    const { key, userId } = req.body as ApiKeyCreate;
    try {
      const data = await apiKeyUseCase.create(userId as string); // Pass both key and userId as arguments
      return res.status(201).send(data);
    } catch (error: any) {
      if (error instanceof ErrorREST) {
        return res.status(error.response.status).send({
          message: error.response.message,
          detail: error.response.detail,
        });
      } else {
        console.error("Erro ao criar API:", error);
        return res.status(500).send({ message: 'Internal Server Error' });
      }
    }
  });
}
