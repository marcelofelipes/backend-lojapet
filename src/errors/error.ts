import { z } from 'zod';

const ErrorSchema = z.object({
  status: z.number(),
  message: z.string(),
  detail: z.string().optional(),
});

type ErrorType = z.infer<typeof ErrorSchema>;

export const Errors = {
  BadRequest: {
    status: 400,
    message: "Request has wrong format."
  },
  Unauthorized: {
    status: 401,
    message: "Authentication credentials not valid."
  },
  Forbidden: {
    status: 403,
    message: "You're missing permission to execute this request."
  },
}

export const ErrorsAPI = {
  Missing: {
    status: 404,
    message: "Missing API Key.",
  },
  Unauthorized: {
    status: 401,
    message: "Unauthorized access to this resource.",
  },
  Forbidden: {
    status: 403,
    message: "You're missing permission to execute this request."
  },
  NotFound: {
    status: 404,
    message: "Resource not found."
  },
  Conflict: {
    status: 409,
    message: "User already exists."
  },
}

export class ErrorREST extends Error {
  public response: ErrorType;

  constructor(error: ErrorType) {
    super(error.message);

    const validatedError = ErrorSchema.parse(error);
    this.response = validatedError;
  }
}
