export const GET_MY_VOTES = `query GetMyVotes { vote { getMyVotes { id title category status totalResponses finishedAt hasVoted } } }`;

export const GET_VOTE_BY_ID = `query GetVoteById($id: ID!) { vote { getVoteById(id: $id) { id title category status totalResponses finishedAt hasVoted } } }`;

export const GET_ALL_VOTES = `query GetAllVotes { vote { getAllVotes { id title category status totalResponses finishedAt hasVoted } } }`;
