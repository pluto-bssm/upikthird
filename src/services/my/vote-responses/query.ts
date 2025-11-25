export const GET_MY_VOTE_RESPONSES = `
query MyQuery {
  vote {
    getMyVotes {
      category
      closureType
      hasVoted
      id
      finishedAt
      totalResponses
      status
      title
      participantThreshold
      options {
        id
        content
        responseCount
        percentage
      }
    }
  }
}
`;

export const GET_VOTE_RESPONSE_DETAIL = `
  query GetVoteDetail {
    vote {
      getMyVotes {
        id
        title
        category
        status
        closureType
        participantThreshold
        finishedAt
        totalResponses
        hasVoted
        options {
          id
          content
          responseCount
          percentage
        }
      }
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
