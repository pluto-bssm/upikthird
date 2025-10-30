"use client";

import { useQuery, useMutation } from '@apollo/client/react';
import { GET_VOTES, GET_VOTE_BY_ID, CREATE_VOTE, CREATE_VOTE_RESPONSE, AIOPTION_CREATE, TODAY_VOTE,CREATE_TAIL_VOTE,GET_CHECK_BADWORD } from '@/graphql/queries';
import { Vote, CreateVoteInput, CreateVoteResponseInput } from '@/types/api';


interface CheckBadWordData {
  checkBadWord: {
    checkedText: string;
    containsBadWord: boolean;
    message: string;
  };
}

interface CheckBadWordVars {
  text: string;
}

export function useCheckBadWord(text: string) {
  const { data, loading, error, refetch } = useQuery<CheckBadWordData, CheckBadWordVars>(
    GET_CHECK_BADWORD,
    {
      variables: { text },
      fetchPolicy: 'network-only'
    }
  );

  return {
    checkBadWord: data,
    loading,
    error,
    refetch
  };
}


interface CreateTailVoteData {
  tail: {
    createTail: {
      id: string;
      question: string;
      voteId: string;
    }
  }
}

interface CreateTailVoteVars {
  question: string;
  voteId: string;
}

export function useCreateTailVote() {
  const [createTailVoteMutation, { loading, error }] = useMutation<
    CreateTailVoteData,
    CreateTailVoteVars
  >(CREATE_TAIL_VOTE);

  const createTailVote = async (question: string, voteId: string) => {
    try {
      
      
      const result = await createTailVoteMutation({
        variables: { question, voteId },
      }); 
      return result.data?.tail?.createTail;
    } catch (err) {
      throw err;
    }
  };

  return {
    createTailVote,
    loading,
    error
  };
}



interface OptionGeneratorData {
  optionGenerator: {
    generateOptions: {
      options: string[];
      message: string;
    }
  }
}

interface OptionGeneratorVars {
  count: number;
  title: string;
}

export function useAiOptionCreate(count: number, title: string) {
  const { data, loading, error, refetch } = useQuery<OptionGeneratorData, OptionGeneratorVars>(
    AIOPTION_CREATE,
    {
      variables: { count, title },
      fetchPolicy: 'network-only'
    }
  );

  return {
    options: data?.optionGenerator?.generateOptions?.options || [],
    message: data?.optionGenerator?.generateOptions?.message || "",
    loading,
    error,
    refetch
  };
}

interface VotesData {
  vote: {
    getAllVotes: Vote[]
  }
}

export function useVotes() {
  const { data, loading, error, refetch } = useQuery<VotesData>(GET_VOTES, {
    fetchPolicy: 'network-only'
  });
  
  return {
    votes: data?.vote?.getAllVotes || [],
    loading,
    error,
    refetch
  };
}

interface VoteByIdData {
  vote: {
    getVoteById: Vote
  }
}

export function useVoteById(id: string) {
  const { data, loading, error } = useQuery<VoteByIdData>(GET_VOTE_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only'
  });
  
  return {
    vote: data?.vote?.getVoteById,
    loading,
    error
  };
}

interface CreateVoteData {
  vote: {
    createVote: Vote
  }
}

export function useCreateVote() {
  const [createVoteMutation, { loading, error }] = useMutation<CreateVoteData, { input: CreateVoteInput }>(CREATE_VOTE);
  
  const createVote = async (input: CreateVoteInput) => {
    try {
      const result = await createVoteMutation({
        variables: { input },
        refetchQueries: [{ query: GET_VOTES }]
      });
      return result.data?.vote?.createVote;
    } catch (err) {
      throw err;
    }
  };
  
  return {
    createVote,
    loading,
    error
  };
}

interface VoteResponseData {
  voteResponse: {
    createVoteResponse: {
      id: string;
      userId: string;
      voteId: string;
      optionId: string;
      optionContent: string;
      voteTitle: string;
      createdAt: string;
    }
  }
}



export function useVoteResponse() {
  const [createResponseMutation, { loading, error }] = useMutation<
    VoteResponseData,
    { input: CreateVoteResponseInput }
  >(CREATE_VOTE_RESPONSE);

  const createResponse = async (input: CreateVoteResponseInput) => {

    const result = await createResponseMutation({
      variables: { input },
    });

 

  
    return result.data?.voteResponse?.createVoteResponse;
  };

  return {
    createResponse,
    loading,
    error,
  };
}


interface TodayVoteData {
  vote: {
    getLeastPopularOpenVote: Vote
  }
}

export function useTodayVote() {
  const { data, loading, error, refetch } = useQuery<TodayVoteData>(TODAY_VOTE, {
    fetchPolicy: 'network-only'
  });

  return {
    vote: data?.vote?.getLeastPopularOpenVote,
    loading,
    error,
    refetch
  };
}
