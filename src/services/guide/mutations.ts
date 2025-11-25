export const CREATE_REVOTE = `
mutation CreateRevote($input: CreateRevoteInput!) {
  revote {
    createRevote(
      input: $input
    ) {
      createdAt
      detailReason
      guideId
      id
      reason
      status
      statusDescription
      updatedAt
      userId
    }
  }
}
`;

export const INCREMENT_GUIDE_LIKE = `
mutation IncrementGuideLike($id: ID!) {
  guide {
    incrementGuideLike(id: $id)
  }
}
`;

export const DECREMENT_GUIDE_LIKE = `
mutation DecrementGuideLike($id: ID!) {
  guide {
    decrementGuideLike(id: $id)
  }
}
`;
