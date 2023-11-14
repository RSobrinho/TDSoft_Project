export const errorResponse = {
  required: ['response', 'error'],
  type: 'object',
  properties: {
    response: { type: 'string' },
    error: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        path: {
          type: 'string',
        },
        statusCode: {
          type: 'number',
        },
        message: {
          type: 'string',
        },
      },
    },
  },
};
