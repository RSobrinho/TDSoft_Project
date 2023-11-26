export const postAuthRequest = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: {
      type: 'string',
    },
  },
};

export const postAuthResponse = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
    token: { type: 'string' },
  },
};
