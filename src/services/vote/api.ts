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
  GET_AIOPTION_COUNT
} from "./queries";
import {
  CREATE_VOTE_RESPONSE,
  CREATE_VOTE,
  CREATE_TAIL_VOTE,
  REPORT_QUESTION,
  OPTION_GEERATOR_COUNT
} from "./mutations";
import { authorization } from "@/apis/token";
import { CreateVoteInput } from "@/types/api";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}


export async function getMyVotes(): Promise<VotePayload[]> {
  const response = await upik.post(
    "",
    {
      query: GET_MY_VOTES,
    } as GraphQLRequest,
    authorization(),
  );

  return response.data?.data?.vote?.getMyVotes || [];
}

export async function getVoteById(id: string): Promise<VotePayload> {
  const response = await upik.post(
    "",
    {
      query: GET_VOTE_BY_ID,
      variables: { id },
    } as GraphQLRequest,
    authorization(),
  );

  const vote = response.data?.data?.vote?.getVoteById;
  if (!vote) {
    throw new Error("Vote not found");
  }
  return vote;
}

export async function getAllVotes(): Promise<VotePayload[]> {
  const response = await upik.post(
    "",
    {
      query: GET_ALL_VOTES,
    } as GraphQLRequest,
    authorization(),
  );

  return response.data?.data?.vote?.getAllVotes || [];
}

export async function createVoteResponse(
  input: CreateVoteResponseInput,
): Promise<boolean> {
  const response = await upik.post(
    "",
    {
      query: CREATE_VOTE_RESPONSE,
      variables: { input },
    } as GraphQLRequest,
    authorization(),
  );

  const result = response.data?.data?.voteResponse?.createVoteResponse;
  if (!result) {
    throw new Error("Failed to create vote response");
  }
  return true;
}



/**
 * 모든 투표 목록 조회 (필터링 포함)
 */
export async function getVotes(): Promise<VotePayload[]> {
  const response = await upik.post(
    "",
    {
      query: GET_VOTES,
    } as GraphQLRequest,
    authorization(),
  );

  return response.data?.data?.vote?.getAllVotes || [];
}

/**
 * 오늘의 투표 조회 (가장 인기 없는 투표)
 */
export async function getTodayVote(): Promise<VotePayload | null> {
  const response = await upik.post(
    "",
    {
      query: TODAY_VOTE,
    } as GraphQLRequest,
    authorization(),
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
  const response = await upik.post(
    "",
    {
      query: GET_CHECK_BADWORD,
      variables: { text },
    } as GraphQLRequest,
    authorization(),
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
  success: boolean;
  aiQuota: {
    canUseAI: boolean;
    maxUsageCount: number;
    remainingCount: number;
    usageCount: number;
    canUseNow: boolean;
  };
}

export async function generateAiOptions(
  count: number,
  title: string,
): Promise<GenerateOptionsResult> {
  const response = await upik.post(
    "",
    {
      query: AIOPTION_CREATE,
      variables: { count, title },
    } as GraphQLRequest,
    authorization(),
  );

  const data = response.data?.data;
  const result = data?.optionGenerator?.generateOptions;
  const quota = data?.aiQuota;

  if (!result) {
    throw new Error("Failed to generate options");
  }

  if (!quota) {
    throw new Error("AI quota information not available");
  }

  return {
    options: result.options,
    message: result.message,
    success: result.success,
    aiQuota: {
      canUseAI: quota.canUseAI,
      maxUsageCount: quota.getMyQuota.maxUsageCount,
      remainingCount: quota.getMyQuota.remainingCount,
      usageCount: quota.getMyQuota.usageCount,
      canUseNow: quota.getMyQuota.canUseNow,
    },
  };
}

/**
 * 투표 생성
 */
export async function createVote(input: CreateVoteInput): Promise<VotePayload> {
  try {
    const response = await upik.post(
      "",
      {
        query: CREATE_VOTE,
        variables: { input },
      } as GraphQLRequest,
      authorization(),
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
  const response = await upik.post(
    "",
    {
      query: CREATE_TAIL_VOTE,
      variables: { question, voteId },
    } as GraphQLRequest,
    authorization(),
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
  try {
    const response = await upik.post(
      "",
      {
        query: REPORT_QUESTION,
        variables: { questionId, reason },
      } as GraphQLRequest,
      authorization(),
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

interface AiQuotaResult {
  canUseNow: boolean;
  lastResetDate: string;
  maxUsageCount: number;
  remainingCount: number;
  usageCount: number;
}

export async function getAiQuota(): Promise<AiQuotaResult> {
  const response = await upik.post(
    "",
    {
      query: OPTION_GEERATOR_COUNT, 
    } as GraphQLRequest,
    authorization(),
  );


  const quota = response.data?.data?.aiQuota?.useAIQuota; 
  if (!quota) {
    throw new Error("Failed to get AI quota");
  }

  return quota;
}


interface AiQuotaResult {
  canUseNow: boolean;
  lastResetDate: string;
  maxUsageCount: number;
  remainingCount: number;
  usageCount: number;
}

interface AiQuotaResponse {
  data: {
    aiQuota: {
      canUseAI: boolean;
      getMyQuota: {
        maxUsageCount: number;
        remainingCount: number;
        usageCount: number;
        canUseNow: boolean;
        lastResetDate: string;
      };
    };
  };
}

export async function getAICOUNT(): Promise<AiQuotaResult> {
  const response = await upik.post<AiQuotaResponse>(
    "",
    {
      query: GET_AIOPTION_COUNT,
    } as GraphQLRequest,
    authorization(),
  );

  const quota = response.data?.data?.aiQuota?.getMyQuota;
  if (!quota) {
    throw new Error("Failed to get AI quota");
  }

  return {
    canUseNow: quota.canUseNow,
    lastResetDate: quota.lastResetDate,
    maxUsageCount: quota.maxUsageCount,
    remainingCount: quota.remainingCount,
    usageCount: quota.usageCount,
  };
}
