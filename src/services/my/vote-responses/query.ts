export const GET_MY_VOTE_RESPONSES = `
  query MyQuery {
    vote {
      getAllVotes {
        id
        hasVoted
        title
        status
        totalResponses
        finishedAt
        closureType
        category
      }
    }
  }
`;

export const GET_VOTE_RESPONSE_DETAIL = `
  query GetVoteDetail($voteId: ID!) {
    vote {
      getVoteById(id: $voteId) {
        id
        title
        category
        status
        closureType
        participantThreshold
        finishedAt
        totalResponses
        hasVoted
        createdBy
        myOptionId
        myOptionContent
        options {
          id
          content
          responseCount
          percentage
        }
      }
    }
    voteResponse {
      hasUserVoted(voteId: $voteId)
    }
  }
`;

export const GET_VOTE_RESPONSE_COUNT = `
  query GetVoteResponseCount($voteId: ID!) {
    voteResponse {
      getVoteResponseCount(voteId: $voteId)
    }
  }
`;

export const GET_OPTION_RESPONSE_COUNT = `
  query GetOptionResponseCount($optionId: ID!) {
    voteResponse {
      getOptionResponseCount(optionId: $optionId)
    }
  }
`;

export const HAS_USER_VOTED = `
  query HasUserVoted($voteId: ID!) {
    voteResponse {
      hasUserVoted(voteId: $voteId)
    }
  }
`;
