export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
}

export interface VoteOption {
  id: string;
  content: string;
  responseCount: number;
  percentage: number;
}

export interface Vote {
  id: string;
  title: string;
  category: string;
  status: string;
  totalResponses: number;
  createdAt: string;
  finishedAt: string;
  options?: VoteOption[];
  hasVoted?: boolean;
}

export interface Guide {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category?: string;
  guideType?: string;
  like?: number;
  likeCount?: number;
  revoteCount?: number;
  voteId?: string;
}

export interface SimilarGuide {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  guideType: string;
  keyword: string;
  likeCount: number;
  revoteCount: number;
  userEmail?: string | null;
  userId?: string | null;
  userName?: string | null;
  userProfileImage?: string | null;
}

export interface Comment {
  id: string;
  content: string;
  userName: string;
  createdAt: string;
  updatedAt?: string;
  parentId?: string;
  replies?: Comment[];
}

export interface Question {
  id: string;
  title: string;
  content?: string;
  userName: string;
  userProfileImage?: string;
  createdAt: string;
  updatedAt?: string;
  bookmarkCount: number;
  commentCount: number;
  viewCount: number;
  isBookmarked?: boolean;
}

export interface QuestionsResponse {
  data: {
    board: {
      getQuestionList: {
        content: Question[];
        totalElements: number;
        totalPages: number;
        __typename: string;
      };
      __typename: string;
    };
    __typename: string;
  };
}

export interface UseQuestionsReturn {
  questions: QuestionsResponse | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}

export interface Bookmark {
  id: string;
  userId: string;
  guideId: string;
  createdAt: string;
}

export interface AIQuota {
  usageCount: number;
  maxUsageCount: number;
  remainingCount: number;
  lastResetDate: string;
  canUseNow: boolean;
}
export enum VoteClosureType {
  DEFAULT = "DEFAULT",
  CUSTOM_DAYS = "CUSTOM_DAYS",
  PARTICIPANT_COUNT = "PARTICIPANT_COUNT",
}

export interface CreateVoteInput {
  title: string;
  category: string;
  options: string[];
  closureType: VoteClosureType;
  customDays?: number;
  participantThreshold?: number;
}

export interface CreateVoteResponseInput {
  voteId: string;
  optionId: string;
}

export interface CreateBoardInput {
  title: string;
  content: string;
}

export interface CreateCommentInput {
  boardId: string;
  content: string;
  parentId?: string;
}

export interface InquiryInput {
  title: string;
  content: string;
  type: string;
  email: string;
}

export interface ReportInput {
  targetId: string;
  reason: string;
  targetType: string;
}

export type CreateRevoteInput = Record<string, unknown>;
export type CreateRevotePayload = {
  createdAt: string;
  detailReason?: string | null;
  guideId: string;
  id: string;
  reason: string;
  status: string;
  statusDescription?: string | null;
  updatedAt: string;
  userId: string;
};
