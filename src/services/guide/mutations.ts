export const REVOTE_MUTATION = `
mutation RevoteMutation($input: CreateRevoteRequestInput!) {
  revote {
    createRevoteRequest(input: $input) {
      createdAt
      detailReason
      guideId
      id
      reason
      userId
    }
  }
}
`;