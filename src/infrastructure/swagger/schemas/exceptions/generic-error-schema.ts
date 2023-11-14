export const errorResponseFormat = {
  '4xx': {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/errors_response',
        },
      },
    },
  },
  '5xx': {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/errors_response',
        },
      },
    },
  },
};
