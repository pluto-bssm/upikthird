import { upik } from "@/apis";
import type { VotePayload, CreateVoteResponseInput } from "@/types/graphql";
import {
  GET_MY_VOTES,
  GET_VOTE_BY_ID,
  GET_ALL_VOTES,
  GET_VOTES,
  TODAY_VOTE,
  GET_CHECK_BADWORD,
  AIOPTION_CREATE,
} from "./queries";
import {
  CREATE_VOTE_RESPONSE,
  CREATE_VOTE,
  CREATE_TAIL_VOTE,
  REPORT_QUESTION,
} from "./mutations";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

// ===================== 기존 함수들 =====================

export async function getMyVotes(): Promise<VotePayload[]> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: GET_MY_VOTES,
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const votes = response.data?.data?.vote?.getMyVotes || [];
  return votes;
}

export async function getVoteById(id: string): Promise<VotePayload> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: GET_VOTE_BY_ID,
      variables: { id },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const vote = response.data?.data?.vote?.getVoteById;
  if (!vote) {
    throw new Error("Vote not found");
  }
  return vote;
}

export async function getAllVotes(): Promise<VotePayload[]> {
  const response = await upik.post("", {
    query: GET_ALL_VOTES,
  } as GraphQLRequest);

  const votes = response.data?.data?.vote?.getAllVotes || [];
  return votes;
}

export async function createVoteResponse(
  input: CreateVoteResponseInput,
): Promise<boolean> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: CREATE_VOTE_RESPONSE,
      variables: { input },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = response.data?.data?.voteResponse?.createVoteResponse;
  if (!result) {
    throw new Error("Failed to create vote response");
  }
  return true;
}

// ===================== 새로 추가된 함수들 =====================

/**
 * 모든 투표 목록 조회 (필터링 포함)
 */
export async function getVotes(): Promise<VotePayload[]> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: GET_VOTES,
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const votes = response.data?.data?.vote?.getAllVotes || [];
  return votes;
}

/**
 * 오늘의 투표 조회 (가장 인기 없는 투표)
 */
export async function getTodayVote(): Promise<VotePayload | null> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: TODAY_VOTE,
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data?.data?.vote?.getLeastPopularOpenVote || null;
}

/**
 * 비속어 체크
 */
interface CheckBadWordResult {
  checkedText: string;
  containsBadWord: boolean;
  message: string;
}

export async function checkBadWord(text: string): Promise<CheckBadWordResult> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: GET_CHECK_BADWORD,
      variables: { text },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = response.data?.data?.checkBadWord;
  if (!result) {
    throw new Error("Failed to check bad word");
  }
  return result;
}

/**
 * AI 옵션 생성
 */
interface GenerateOptionsResult {
  options: string[];
  message: string;
}

export async function generateAiOptions(
  count: number,
  title: string,
): Promise<GenerateOptionsResult> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: AIOPTION_CREATE,
      variables: { count, title },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = response.data?.data?.optionGenerator?.generateOptions;
  if (!result) {
    throw new Error("Failed to generate options");
  }
  return result;
}

import { CreateVoteInput } from "@/types/api";

export async function createVote(input: CreateVoteInput): Promise<VotePayload> {
  const token = Storage.getItem(TOKEN.ACCESS);

  try {
    const response = await upik.post(
      "",
      {
        query: CREATE_VOTE,
        variables: { input },
      } as GraphQLRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data?.errors && response.data.errors.length > 0) {
      const errorMessage = response.data.errors[0].message;

      throw new Error(errorMessage);
    }
    const vote = response.data?.data?.vote?.createVote;

    if (!vote) {
      throw new Error("Failed to create vote");
    }

    return vote;
  } catch (error) {
    throw error;
  }
}

/**
 * 꼬리 투표 생성
 */
interface CreateTailVoteResult {
  id: string;
  question: string;
  voteId: string;
}

export async function createTailVote(
  question: string,
  voteId: string,
): Promise<CreateTailVoteResult> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: CREATE_TAIL_VOTE,
      variables: { question, voteId },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = response.data?.data?.tail?.createTail;
  if (!result) {
    throw new Error("Failed to create tail vote");
  }
  return result;
}

// ===================== 신고 관련 함수 =====================

/**
 * 질문(투표) 신고
 */
interface ReportQuestionResult {
  success: boolean;
  message: string;
}

export async function reportQuestion(
  questionId: string,
  reason: string,
): Promise<ReportQuestionResult> {
  const token = Storage.getItem(TOKEN.ACCESS);

  try {
    const response = await upik.post(
      "",
      {
        query: REPORT_QUESTION,
        variables: { questionId, reason },
      } as GraphQLRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data?.errors && response.data.errors.length > 0) {
      const errorMessage = response.data.errors[0].message;

      throw new Error(errorMessage);
    }

    const result = response.data?.data?.report?.reportQuestion;

    if (!result) {
      throw new Error("Failed to report question");
    }

    return result;
  } catch (error) {
    throw error;
  }
}
