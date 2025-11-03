export const GET_ALL_REPORTS = `
query GetAllReports {
  report {
    getAllReports {
      authorId
      authorName
      category
      content
      createdAt
      guideType
      likeCount
      reason
      revoteCount
      targetCreatedAt
      targetId
      targetTitle
      targetType
      userId
    }
  }
}
`;

export const GET_REPORTS_BY_TARGET = `
  query GetReportsByTarget($targetId: ID!) {
    report {
      getReportsByTarget(targetId: $targetId) {
        authorId
        authorName
        category
        content
        guideType
        createdAt
        likeCount
        reason
        revoteCount
        targetCreatedAt
        targetId
        targetTitle
        targetType
        userId
      }
    }
  }
`;
