export const CREATE_VOTE = `
  mutation CreateVote($input: CreateVoteInput!) {
    vote {
      createVote(input: $input) {
        id
        title
        category
        status
        createdAt
      }
    }
  }
`;

export const UPDATE_VOTE = `
  mutation UpdateVote($voteId: ID!, $input: UpdateVoteInput!) {
    vote {
      updateVote(voteId: $voteId, input: $input) {
        id
        title
        status
        updatedAt
      }
    }
  }
`;

export const DELETE_VOTE = `
  mutation DeleteVote($voteId: ID!) {
    vote {
      deleteVote(voteId: $voteId) {
        id
      }
    }
  }
`;

export const FINISH_VOTE = `
  mutation FinishVote($voteId: ID!) {
    vote {
      finishVote(voteId: $voteId) {
        id
        status
        finishedAt
      }
    }
  }
`;
