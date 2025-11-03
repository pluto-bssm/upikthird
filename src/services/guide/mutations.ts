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
