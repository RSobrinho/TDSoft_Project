export const getBalanceResponse = {
  required: ['balance', 'pendent'],
  type: 'object',
  properties: {
    balance: { type: 'number' },
    pendent: {
      type: 'number',
    },
  },
};
