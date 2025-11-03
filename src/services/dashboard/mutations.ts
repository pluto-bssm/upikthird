export const REJECT_REPORT = `
mutation RejectReport($targetId: ID!, $userId: ID!) {
  report {
    rejectReport(targetId: $targetId, userId: $userId) {
      message
    }
  }
}
`;
