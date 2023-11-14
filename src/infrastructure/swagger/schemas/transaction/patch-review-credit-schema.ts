export const patchReviewCreditRequest = {
  type: 'object',
  properties: {
    reviewerUserId: { type: 'string' },
    status: {
      type: 'string',
    },
  },
};
