export const genericApiError = {
  type: 'object',
  properties: {
    errorKey: {
      type: 'number',
    },
    errorMessage: {
      type: 'string',
    },
    details: {
      type: 'object',
    },
  },
};
