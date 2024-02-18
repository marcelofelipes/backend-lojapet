import { registerSchema } from '@Config/schemas/Schemas';
import { ErrorREST } from "@errors/error";
import { UserCreate } from "@interfaces/user.interface";
import { UserUseCase } from "@usecases/user.usecase";
import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from "fastify";

export default async function (app: FastifyInstance, opts: RouteOptions) {
  const userUseCase = new UserUseCase();

  // Register route
  app.post<{ Body: UserCreate }>('/register', { schema: registerSchema }, async (req: FastifyRequest, res: FastifyReply) => {
    const { name, email, password } = req.body as UserCreate;
    try {
      const data = await userUseCase.create({ name, email, password });
      return res.status(201).send(data);
    } catch (error: any) {
      if (error instanceof ErrorREST) {
        return res.status(error.response.status).send({
          message: error.response.message,
          detail: error.response.detail,
        });
      } else {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).send({ message: 'Internal Server Error' });
      }
    }
  });

  // Users route
  app.get('/users', async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const data = await userUseCase.getAll();
      return res.status(200).send(data);
    } catch (error: any) {
      console.error("Erro ao listar usuários:", error);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  });

  // Get user by email route
  app.get<{ Params: { email: string } }>('/user/:email', async (req, res) => { // Specify the expected type for request parameters
    const { email } = req.params;
    try {
      const data = await userUseCase.findByEmail(email);
      if (data) {
        return res.status(200).send(data);
      } else {
        return res.status(404).send({ message: 'User not found' });
      }
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  });
}
