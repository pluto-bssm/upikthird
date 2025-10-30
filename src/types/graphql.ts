export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  username: string;
}
export interface OptionWithStats {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

export interface VotePayload {
  id: string;
  title: string;
  category: string;
  status: string; // "OPEN" | "CLOSED"
  totalResponses: number;
  finishedAt: string | null;
  options: OptionWithStats[];
  hasVoted: boolean;
}

export interface MyVote {
  id: string;
  title: string;
  category: string;
  status: string;
  totalResponses: number;
  finishedAt: string | null;
  options: OptionWithStats[];
  hasVoted: boolean;
}

export interface GetMyVotesResponse {
  data: MyVote[];
}

export interface CommentUser {
  id: string;
  name: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  content: string;
  author?: CommentUser;
  createdAt: string;
  updatedAt?: string;
  likes?: number;
  replies?: Comment[];
  // For direct API response mapping
  userId?: string;
  userName?: string;
  userProfileImage?: string;
  boardId?: string;
  parentId?: string;
}

export interface CommentPage {
  content: Comment[];
  totalPages: number;
  totalElements: number;
  currentPage?: number;
  pageSize?: number;
}

export interface BoardAuthor {
  id: string;
  name: string;
  avatar?: string;
}

export interface Board {
  id: string;
  title: string;
  content: string;
  author?: BoardAuthor;
  category?: string;
  status?: string; // "OPEN" | "CLOSED"
  createdAt: string;
  updatedAt?: string;
  views?: number;
  viewCount?: number; // for question list
  likes?: number;
  like?: number; // for saved guides
  commentCount?: number;
  voteId?: string; // for saved guides
  bookmarkCount?: number;
  userId?: string; // for likes
  userName?: string; // for likes
  isBookmarked?: boolean; // for likes
}

export interface BoardDetail extends Board {
  comments: Comment[];
}

export interface BoardPage {
  content: Board[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
}

export interface CreateQuestionInput {
  title: string;
  content: string;
}

export interface UpdateQuestionInput {
  title?: string;
  content?: string;
}

export interface CreateCommentInput {
  boardId: string;
  content: string;
  parentId?: string;
}

export interface ReportInput {
  reason: string;
  detail: string;
}

export interface CreateVoteResponseInput {
  voteId: string;
  optionId: string;
}

export interface CreateVoteInput {
  title: string;
  options: string[];
  category?: string;
}

export interface QuestionReportPayload {
  success: boolean;
  message: string;
}

export interface SearchResponse {
  content: Board[];
  totalPages: number;
  totalElements: number;
}

export interface VoteResponsePayload {
  success: boolean;
  message: string;
  voteId: string;
  optionId: string;
}

export interface PaginationParams {
  page: number;
  size: number;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
}
