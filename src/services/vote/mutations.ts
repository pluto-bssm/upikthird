/**
 * Vote GraphQL Mutations
 */

export const CREATE_VOTE = `
  mutation CreateVote($input: CreateVoteInput!) {
    vote {
      createVote(input: $input) {
        id
        title
        category
        status
        totalResponses
        finishedAt
        hasVoted
        options {
          id
          text
          votes
          percentage
        }
      }
    }
  }
`;

export const CREATE_VOTE_RESPONSE = `
  mutation CreateVoteResponse($input: CreateVoteResponseInput!) {
    voteResponse {
      createVoteResponse(input: $input) {
        success
        message
        voteId
        optionId
      }
    }
  }
`;
