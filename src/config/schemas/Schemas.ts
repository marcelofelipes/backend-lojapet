export const registerSchema = {
  tags: ['Public'],
  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        photo: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        detail: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        detail: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};