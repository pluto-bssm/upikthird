export const GET_MY_VOTES = `
  query MyQuery {
    vote {
      getMyVotes {
        category
        finishedAt
        hasVoted
        id
        status
        title
        totalResponses
        options {
          content
          id
          percentage
          responseCount
        }
      }
    }
  }
`;
