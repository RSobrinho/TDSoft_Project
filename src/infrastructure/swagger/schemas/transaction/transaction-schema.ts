export const transactionResponse = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    referenceId: {
      type: 'string',
      nullable: true,
    },
    senderUserId: { type: 'string' },
    recipientUserId: { type: 'string' },
    value: { type: 'number' },
    type: { type: 'string' },
    status: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
    },
    receipt: {
      type: 'string',
      nullable: true,
    },
    reviewerUserId: {
      type: 'string',
      nullable: true,
    },
    reviewedAt: {
      type: 'string',
      nullable: true,
    },
  },
};
