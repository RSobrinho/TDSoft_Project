export const getBalanceResponse = {
  required: ['balance', 'pendent'],
  type: 'object',
  properties: {
    recipientUserId: {
      type: 'string',
    },
    balance: { type: 'number' },
    credit: {
      type: 'object',
      properties: {
        valueTotalApproved: {
          type: 'number',
        },
        countApproved: {
          type: 'number',
        },
        valueTotalPendent: {
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
        valueTotal: {
          type: 'number',
        },
        count: {
          type: 'number',
        },
      },
    },
  },
};
