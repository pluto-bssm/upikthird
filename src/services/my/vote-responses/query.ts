export const GET_MY_VOTE_RESPONSES = `
  query MyQuery {
    vote {
      getMyVotes {
        category
        finishedAt
        id
        hasVoted
        status
        title
        totalResponses
      }
    }
  }
`;

export const GET_VOTE_RESPONSE_DETAIL = `
  query GetVoteDetail($id: ID!) {
    vote {
      getVoteById(id: $id) {
        id
        title
        category
        status
        finishedAt
        totalResponses
        options {
          id
          content
          votes
          percentage
        }
      }
    }
  }
`;
