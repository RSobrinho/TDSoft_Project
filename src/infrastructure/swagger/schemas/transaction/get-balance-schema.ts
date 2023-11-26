export const getBalanceResponse = {
  required: ['balance', 'pendent'],
  type: 'object',
  properties: {
    recipientUserId: {
      type: 'string',
    },
    balance: { type: 'number' },
    pendent: {
      type: 'number',
    },
    credit: {
      type: 'object',
      properties: {
        totalApproved: {
          type: 'number',
        },
        totalPendent: {
          type: 'number',
        },
        countApproved: {
          type: 'number',
        },
        countPendent: {
          type: 'number',
        },
      },
    },
    debit: {
      type: 'object',
      properties: {
        total: {
          type: 'number',
        },
        count: {
          type: 'number',
        },
      },
    },
  },
};
